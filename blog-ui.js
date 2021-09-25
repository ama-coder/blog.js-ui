//blog.js-ui
//copyright: AmACoder

//funcs
var getAttribute = (tag_name,att_name) => {

    let tag_col = document.getElementsByTagName(tag_name);
    for (let i = 0;i<tag_col.length;i++) {

            if (tag_col[i].getAttribute(att_name) != null && tag_col[i].getAttribute(att_name) != "") {

                return tag_col[i].getAttribute(att_name);

            }

    }

}

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
var update = (postname,redirect = true,redirect_URL) => {


    let elms = document.getElementsByClassName("blog.js-ui-element");
    for(let i = 0;i<elms.length;i++) 
        elms[i].setAttribute("post-name",postname)
    set_post(postname);
    update_elemnts();
    if (redirect == true)
    window.history.pushState(null,null,redirect_URL)

    return
}
//main app body
set_post_info();
