//blog.js-ui
//copyright: AmACoder

//funcs
var setpostinfo = () => {

    let link_elements = document.getElementsByTagName("link");
    let path;
    let reg;

    for(var i = 0 ; i < link_elements.length; i++)
    {
        var att = link_elements[i].getAttribute("rel");
        if(att == "postinfo")
            path = link_elements[i].getAttribute("href");
            reg = link_elements[i].getAttribute("registry")
            break;
    }
    if (localStorage.getItem("posts_info_registry") == reg) {

        return;

    }
    else {

        var posts_info = getPostsInfo(path);
        localStorage.setItem("posts_info",JSON.stringify(posts_info));
        localStorage.setItem("posts_info_registry",posts_info.reg.$UI_REG);

    }
    
}
var setposts = () => {

    let link_elements = document.getElementsByTagName("link");
    let name;
    for(var i = 0 ; i < link_elements.length; i++)
    {
        var att = link_elements[i].getAttribute("rel");
        if(att == "post") {
            
            name = link_elements[i].getAttribute("post-name");
            break;
        }
    }
    let info = JSON.parse(localStorage.getItem("posts_info"));
    let post = getPost(name,info);
    post.content.generated = genContent(post);
    sessionStorage.setItem(name+"_post",JSON.stringify(post));
}



//main app body
setpostinfo();
setposts();


  