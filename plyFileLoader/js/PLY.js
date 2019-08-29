//TODO :: 모든 버택스 한 배열안으로 하기 위한 로직 수정 필요
//TODO :: 버텍스 담긴 배열길이와 실질 데이터 길이 비교 필요 line -> 3개 정보 (x y z)
//        그러므로 버텍스 배열은 line * 3 개수여야한다

function PLY()
{

}

PLY.prototype.parsePly = function(data)
{
    var vertices = new Array();
    var textureCoords = new Array();
    var connectivity = new Connectivity();

    var header = this.parseHeader(data);

    var B_result;
    var patternBody = /end_header\s([\s\S]*)$/
    var body = '';

    if ((B_result = patternBody.exec(data)) !== null) {
        body = B_result[ 1 ]
    }

    var B_lines = body.split('\n')

    //header{vertex, face} 이렇게 두개 index 있음
    var currentElementIndex = 0
    //해당 index와 관련된 line 수
    var currentElementCount = 0

    var indexV = 0;
    for (var i = 0; i < B_lines.length; i++) {

        var polygon = new Polygon();
        var B_line = B_lines[ i ];
        B_line = B_line.trim();

        if (B_line === '') {
            continue
        }

        //전체 라인을 돌면서 vertex 먼저( index 0 ) 돌고 해당 index와 관련된 line 수가 데이터에 정의 된것보다 같거나 커지면 face관련된 라인이 시작된것임으로 inddex 증가시키고 해당 카운트 리셋
        if (currentElementCount >= header.elements[ currentElementIndex ].count) {
            currentElementIndex++;
            currentElementCount = 0;
        }
/*
        if(currentElementIndex > header.elements.length){
            console.log(currentElementIndex+">"+header.elements.length)
            break;
        }*/

        //한라인을 속성대로 쪼갠다
        var values = B_line.split(/\s+/);
        var properties = header.elements[ currentElementIndex ].properties;

        //한 라인안에 들어있는 속성 갯수만큼 반복
        for (var l = 0; l < properties.length; l++) {

            if (properties[ l ].type == 'list') {

                var n = this.parseASCIINumber(values.shift(), properties[ l ].countType);


                if( properties[ l ].name == "vertex_indices" || properties[ l ].name == "texcoord" ){

                    for (let k = 0; k < n; k++) {
                        if(properties[ l ].name == "vertex_indices"){
                            var thisV = values.shift()
                            polygon.vertex_position_indexes.push(this.parseASCIINumber(thisV, properties[ l ].itemType));
                            /*polygon.vertex_texcoord_indexes.push(this.parseASCIINumber(thisV, properties[ l ].itemType));*/
                            polygon.vertex_texcoord_indexes.push(indexV);
                            indexV++;
                        }else if(properties[ l ].name == "texcoord"){
                            textureCoords.push(this.parseASCIINumber(values.shift(), properties[ l ].itemType))
                        }else{
                            values.shift();
                        }
                    }

                    if(properties[ l ].name == "vertex_indices"){
                        connectivity.polygons.push(polygon);
                    }

                }

            } else {
                if( properties[ l ].name == "x" || properties[ l ].name == "y" || properties[ l ].name == "z"){
                    vertices.push(this.parseASCIINumber(values.shift(), properties[ l ].type));
                }else{
                    values.shift();
                }
            }
        }

        currentElementCount++
    }

    connectivity.getVertexRemapping();

    var Ply =
        {
            vertices: vertices,
            textureCoords : textureCoords,
            connectivity : connectivity
        };

    console.log(Ply);
    return Ply;

}

PLY.prototype.parseHeader = function(data){
    var patternHeader = /ply([\s\S]*)end_header\s/
    var headerText = '';
    var headerLength = 0;
    var H_result = patternHeader.exec(data);

    if(H_result !== null){
        headerText = H_result[1];
        headerLength = H_result[0].length;
    }

    var header = {
        comments: [],
        elements: [],
        headerLength: headerLength
    }

    var H_lines = headerText.split('\n')
    var currentElement, lineType, lineValues

    function makePlyElementProperty(propertValues){
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

        return property
    }

    for (var i = 0; i < H_lines.length; i++) {
        var H_line = H_lines[ i ];
        H_line = H_line.trim();
        if (H_line === '') {
            continue;
        }

        lineValues = H_line.split(/\s+/); // split("")
        lineType = lineValues.shift()
        H_line = lineValues.join(' ')

        switch (lineType) {
            case 'format':
                header.format = lineValues[ 0 ]
                header.version = lineValues[ 1 ]
                break;

            case 'comment':
                header.comments.push(H_line)
                break;

            case 'element':
                if (currentElement !== undefined) {
                    header.elements.push(currentElement);
                }

                currentElement = {};
                currentElement.name = lineValues[ 0 ];
                currentElement.count = parseInt(lineValues[ 1 ]);
                currentElement.properties = [];

                break;

            case 'property':
                currentElement.properties.push(makePlyElementProperty(lineValues));

                break;

            default:
                console.log('unhandled', lineType, lineValues);
        }
    }

    if (currentElement !== undefined) {
      header.elements.push(currentElement)
    }
    return header
}

PLY.prototype.parseASCIINumber = function(n, type){
    switch (type) {
        case 'char': case 'uchar': case 'short': case 'ushort': case 'int': case 'uint':
        case 'int8': case 'uint8': case 'int16': case 'uint16': case 'int32': case 'uint32':

            return parseInt(n)

        case 'float': case 'double': case 'float32': case 'float64':

            return parseFloat(n)
    }
  }
