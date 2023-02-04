fetch("http://localhost:8765/user/search/category?categoryName=Men's Fashion&loggedInId=cu_tWEysrMxYI").then(response => {
    if (response.ok) {
        return response.json();
    }


    return Promise.reject(response);

}).then(response => {
    console.log(response);
}).catch(response => {
    response.json().then(p => {
        return p;
    }).then(p => {
        console.log(p);
    })
})