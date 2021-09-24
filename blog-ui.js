//blog.js-ui
//copyright: AmACoder

//funcs
var set_post_info = () => {

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
var set_post = (post_name) => {


    let info = JSON.parse(localStorage.getItem("posts_info"));
    let post = getPost(post_name,info);
    post.content.generated = genContent(post);
    sessionStorage.setItem(post_name+"_post",JSON.stringify(post));
}
var update_elemnts = () => {

    let show_elms = document.getElementsByClassName("blog.js-ui-element");
    for(var i = 0 ; i < show_elms.length; i++) {

        let elm_name = show_elms[i].getAttribute("element");
        let sub_elm = show_elms[i].getAttribute("sub-element");
        let post_name = show_elms[i].getAttribute("post-name");
        let raw_post = sessionStorage.getItem(post_name+"_post");
        let post = JSON.parse(raw_post)

            if(sub_elm == null || sub_elm == "") 
               show_elms[i].innerHTML = post[elm_name]
            else 
                show_elms[i].innerHTML = post[elm_name][sub_elm];

            }
        }
var update = (postname) => {

    let elms = document.getElementsByClassName("blog.js-ui-element");
    for(let i = 0;i<elms.length;i++) 
        elms[i].setAttribute("post-name",postname)
    set_post(postname);
    update_elemnts();

}
//main app body
set_post_info();
  