
async function getPost() {
    const reqURL = "https://api.sn.solsynth.dev/cgi/co/posts?take=5&offset=0&type=story&author=Texas0295";
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error ('Response status: ${response.status}$');
        }
        const rsp_json = await response.json();
        return rsp_json;
    }catch (error){
        console.error(error.message);
    }
}


