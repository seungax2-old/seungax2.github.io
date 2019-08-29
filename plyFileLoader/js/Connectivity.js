//
// Mesh Connectivity
//

//Constructor
function Connectivity()
{
	this.polygons 				= new Array();
	this.vertexRemapping 		= undefined;
	this.face_indexes			= undefined;
	this.face_indexes_remapped	= undefined;
}


// TODO Fix
Connectivity.prototype.constructPolygonEdgeList = function()
{

	for(var p_i = 0 ; p_i < this.polygons.length; p_i++)
	{
		var polygon = this.polygons[p_i];

		for(var i = 0 ; i < polygon.vertex_position_indexes.length; i++)
		{
			for(var j = 0 ; j < polygon.vertex_position_indexes.length; j++)
			{
				if(i!=j)
				{
					var index_i = polygon.vertex_position_indexes[i];
					var index_j = polygon.vertex_position_indexes[j];
				}
			}
		}
	}
}

// Get Vertex Remapping
Connectivity.prototype.getVertexRemapping = function()
{
	if(this.vertexRemapping == undefined)
	{
		this.vertexRemapping = new Array();

		for(var i = 0 ; i <  this.polygons.length; i++)
		{
			for(var j = 0 ; j < this.polygons[i].vertex_position_indexes.length; j++)
			{
				var texcoord_index = this.polygons[i].vertex_texcoord_indexes[j];
				var position_index = this.polygons[i].vertex_position_indexes[j];

				this.vertexRemapping[texcoord_index]	 = position_index;
			}
		}
		console.log("Vertex Remapping Calculated size " +  this.vertexRemapping.length);
	}

	return this.vertexRemapping;
}

//
Connectivity.prototype.getFaceIndexes = function()
{
	if(this.face_indexes == undefined)
	{
		this.face_indexes = new Array();

		for(var i = 0 ; i < this.polygons.length; i++)
		{
			for(var j = 0 ; j < this.polygons[i].vertex_position_indexes.length; j++)
			{
				this.face_indexes.push(this.polygons[i].vertex_position_indexes[j]);
			}
		}
		console.log("Face indecies initlised size " +  this.face_indexes.length);
	}

	return this.face_indexes;
}

//
Connectivity.prototype.getFaceIndexesRemapped = function()
{
	if(this.face_indexes_remapped == undefined)
	{
		this.face_indexes_remapped = new Array();

		for(var i = 0 ; i < this.polygons.length; i++)
		{
			for(var j = 0 ; j < this.polygons[i].vertex_texcoord_indexes.length; j++)
			{
				this.face_indexes_remapped.push(this.polygons[i].vertex_texcoord_indexes[j]);
			}
		}
		console.log("Remapped Face indecies initlised size " +  this.face_indexes_remapped.length);
	}

	return this.face_indexes_remapped;
}

//
Connectivity.prototype.getVerticesPerPolygon = function()
{
	return this.polygons[0].vertex_position_indexes.length;
}
