function PLY(){
    this.propertyNameMapping = {}
    this.vertex = new Array();
    this.face_vertex_indices = new Array();
    this.face_texcoord = new Array();
}

PLY.prototype.parsePly = function(data){

    var header = this.parseHeader(data);

    var patternBody = /end_header\s([\s\S]*)$/
    var body = ''
    if ((result = patternBody.exec(data)) !== null) {
        body = result[ 1 ]
    }

    var lines = body.split('\n')
    var currentElement = 0
    var currentElementCount = 0

    for (var i = 0; i < lines.length; i++) {
        var line = lines[ i ];
        line = line.trim();

        if (line === '') {
            continue;
        }

        if (currentElementCount >= header.elements[ currentElement ].count) {
            currentElement++
            currentElementCount = 0
        }

        var element = this.parseASCIIElement(header.elements[ currentElement ].properties, line)

        currentElementCount++
    }

    ply = {
        vertex : this.vertex,
        face_vertex_indices : this.face_vertex_indices,
        face_texcoord : this.face_texcoord
    }

    console.log(ply);

}

PLY.prototype.parseHeader = function(data){
    var patternHeader = /ply([\s\S]*)end_header\s/
    var headerText = ''
    var headerLength = 0
    var result = patternHeader.exec(data)

    if (result !== null) {
        headerText = result[ 1 ]
        headerLength = result[ 0 ].length
    }

    var header = {
        comments: [],
        elements: [],
        headerLength: headerLength
    }

    var lines = headerText.split('\n')
    var currentElement, lineType, lineValues

    function makePlyElementProperty (propertValues, propertyNameMapping) {
        var property = {
            type: propertValues[ 0 ]
        }

        if (property.type === 'list') {
            property.name = propertValues[ 3 ]
            property.countType = propertValues[ 1 ]
            property.itemType = propertValues[ 2 ]
        } else {
            property.name = propertValues[ 1 ]
        }

        if (property.name in propertyNameMapping) {
            property.name = propertyNameMapping[ property.name ]
        }

        return property
    }

    for (var i = 0; i < lines.length; i++) {
        var line = lines[ i ]
        line = line.trim()

        if (line === '') {
            continue
        }

        lineValues = line.split(/\s+/)
        lineType = lineValues.shift()
        line = lineValues.join(' ')

        switch (lineType) {
            case 'format':
                header.format = lineValues[ 0 ]
                header.version = lineValues[ 1 ]
                break;

            case 'comment':
                header.comments.push(line)
                break;

            case 'element':
                if (currentElement !== undefined) {
                    header.elements.push(currentElement)
                }
                currentElement = {}
                currentElement.name = lineValues[ 0 ]
                currentElement.count = parseInt(lineValues[ 1 ])
                currentElement.properties = []
                break;

            case 'property':
                currentElement.properties.push(makePlyElementProperty(lineValues, this.propertyNameMapping))
                break;

            default:
                console.log('unhandled', lineType, lineValues);
        }
    }

    if (currentElement !== undefined) {
        header.elements.push(currentElement)
    }

    return header;
}

PLY.prototype.parseASCIIElement = function(properties, line){
    var values = line.split(/\s+/)

    for (var i = 0; i < properties.length; i++) {
        if (properties[ i ].type === 'list') {
            var list = []
            var n = this.parseASCIINumber(values.shift(), properties[ i ].countType)

            if(properties[ i ].name == 'texcoord'){
                for (var j = 0; j < n; j++) {
                    this.face_texcoord.push(this.parseASCIINumber(values.shift(), properties[ i ].itemType));
                }
            }else if(properties[ i ].name == 'vertex_indices'){
                for (var j = 0; j < n; j++) {
                    list.push(this.parseASCIINumber(values.shift(), properties[ i ].itemType))
                }
                this.face_vertex_indices.push(list)
            }
        } else {
            if(properties[ i ].name == 'x' || properties[ i ].name == 'y' || properties[ i ].name == 'z'){
                this.vertex.push(this.parseASCIINumber(values.shift(), properties[ i ].type))
            }
        }
    }
}

PLY.prototype.parseASCIINumber = function (n, type) {
    switch (type) {
        case 'char': case 'uchar': case 'short': case 'ushort': case 'int': case 'uint':
        case 'int8': case 'uint8': case 'int16': case 'uint16': case 'int32': case 'uint32':

        return parseInt(n)

        case 'float': case 'double': case 'float32': case 'float64':

        return parseFloat(n)
    }
}
