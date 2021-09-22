// blog.js created by ama
//copy right : GPL-3

var xhttp = new XMLHttpRequest();

var getData = (path,json = true) => {

    xhttp.open('GET', path, false);
    xhttp.send(null);

    if(json == true)
        return JSON.parse(xhttp.responseText);
    else
        return xhttp.responseText

}
var getPostsInfo = (path) => {

    let data = getData(path);
    var reg = {};
    for (let i=0;i<Object.keys(data).length;i++) {

        if(Object.keys(data)[i][0] == "$") {

            reg [Object.keys(data)[i]] = data[Object.keys(data)[i]];
            delete data[Object.keys(data)[i]];   

        }
        
    } 
    let info = {

        'count' :Object.keys(data).length,
        'posts' : data,
        'reg' : reg 

    };
    return info;

}

var getPost = (postname,postsInfo) => {

    return getData(postsInfo.posts[postname]);

}
var genContent = (post) => {

    let raw = getData(post.content.path,false);
    let data;
    switch (post.content.type) {
        case "text":
            data = "<pre>"+raw+"</pre>";
            break;
    
        case "html":
            data = raw;
    }
    return data;

} 
