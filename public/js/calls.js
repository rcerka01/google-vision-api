
function formatJSON(json,textarea) {
    var nl;
    if(textarea) {
        nl = "&#13;&#10;";
    } else {
        nl = "<br>";
    }
    var tab = "&#160;&#160;&#160;&#160;";
    var ret = "";
    var numquotes = 0;
    var betweenquotes = false;
    var firstquote = false;
    for (var i = 0; i < json.length; i++) {
        var c = json[i];
        if(c == '"') {
            numquotes ++;
            if((numquotes + 2) % 2 == 1) {
                betweenquotes = true;
            } else {
                betweenquotes = false;
            }
            if((numquotes + 3) % 4 == 0) {
                firstquote = true;
            } else {
                firstquote = false;
            }
        }

        if(c == '[' && !betweenquotes) {
            ret += c;
            ret += nl;
            continue;
        }
        if(c == '{' && !betweenquotes) {
            ret += tab;
            ret += c;
            ret += nl;
            continue;
        }
        if(c == '"' && firstquote) {
            ret += tab + tab;
            ret += c;
            continue;
        } else if (c == '"' && !firstquote) {
            ret += c;
            continue;
        }
        if(c == ',' && !betweenquotes) {
            ret += c;
            ret += nl;
            continue;
        }
        if(c == '}' && !betweenquotes) {
            ret += nl;
            ret += tab;
            ret += c;
            continue;
        }
        if(c == ']' && !betweenquotes) {
            ret += nl;
            ret += c;
            continue;
        }
        ret += c;
    } // i loop
    return ret;
}

function getData(filename, divId) {

    var body = {
                "requests":[
                    {
                    "image":{
                        "source":{
                        "imageUri":
                            "gs://test-image-recognition-bucket/20-episode-images/" + filename
                            }
                        },
                        "features":[
                        {
                        "type":"LABEL_DETECTION",
                        "maxResults":2
                        },
                        {
                        "type": "TEXT_DETECTION",
                        "maxResults":2
                        },
                        {
                        "type": "DOCUMENT_TEXT_DETECTION",
                        "maxResults":2
                        },
                        {
                        "type": "SAFE_SEARCH_DETECTION",
                        "maxResults":2
                        },
                        {
                        "type": "CROP_HINTS",
                        "maxResults":20
                        },
                        {
                        "type": "FACE_DETECTION"
                        },
                        {
                        "type": "IMAGE_PROPERTIES"
                        }
                    ]
                    }
                ]
                };
        $.ajax({
            type: "POST",
            url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAF1pTzz_yXk97cebcXnPHDiV7PM5HLwG4",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(body),
            success: function(responses) { 
               var img = '<img src="https://storage.googleapis.com/test-image-recognition-bucket/20-episode-images/' +filename+ '"></img><br>'
                $("#"+divId).html(img + "<br>"+divId+"<br>" + formatJSON(JSON.stringify(responses), false));
            }
        })
}