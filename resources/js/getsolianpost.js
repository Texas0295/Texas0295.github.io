async function getPosts() {
  const reqURL = "https://api.sn.solsynth.dev/cgi/co/posts?take=1&offset=0&type=story&author=Texas0295";
  try {
    const response = await fetch(reqURL);
    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.data && data.data.length > 0) {
      return data.data;
    } else {
      console.log('no data');
      return null;
    }
  } catch (error) {
    console.error('error occurred', error);
    return null;
  }
}

async function getAttachmentMeta(requestURL){
    try {
        const response = await fetch(requestURL);
        if(!response.ok){
            return {type: null};
        }
        const data = await response.json();
        if(data){
            return {type: data.mimetype};
        }
    } catch (error) {
        console.error("error while getting attachment's meta data:", error);
    }
}

function formatUTCtoLocal(utcString) {
  const date = new Date(utcString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function render(posts) {
  const postsContainer = document.querySelector('.solian-posts');
  if (posts && Array.isArray(posts)) {
    posts.forEach(post => {
    var create_time = formatUTCtoLocal(post.created_at);
        const postBody = {
            id: post.id,
            type: post.type,
            title: post.body.title,
            content: post.body.content,
            attachments: post.body.attachments,
            created_at: create_time,
            views: post.total_views,
        };
        console.log(postBody);

        var l_title = postBody.title == null ? "No title" : postBody.title

        const postElement = document.createElement('div');
        postElement.classList.add('solian-post');

        postElement.innerHTML = `
            <div class="publisher"><img src="/resources/img/site/solian-poster.png"></div>
            <div class="solian-post-content">
            <h2>${l_title}</h2>
            <p>At: ${postBody.created_at}</p>
            <p>views: ${postBody.views}</p>
            <p>${postBody.content}</p>
            <div class="solian-post-attachments"></div>
            </div>
        `;

        postsContainer.appendChild(postElement);

        if(postBody.attachments.length > 0){
            try {
                renderAttachments(postBody.attachments);
            } catch (error) {
                console.error(error)
            }
        }
    });
  } else {
      console.log("no valid posts to show.");
  }
}

function renderAttachments(attachments){
    const attachmentsDiv = document.querySelector('.solian-post-attachments');
    attachments.forEach(attachment => {
        try{
            renderAttachment(attachment);
        }catch(error){
            console.error('error while processing attachments:', error);
        }
    });
}

async function renderAttachment(rid){
    const attachmentQueryURL = 'https://api.sn.solsynth.dev/cgi/uc/attachments/'+rid+"/meta";
    const attachmentAccessURL = 'https://api.sn.solsynth.dev/cgi/uc/attachments/'+rid;
    const result = await getAttachmentMeta(attachmentQueryURL);
    console.log(result);
    const divGoingToRender = document.querySelector('.solian-post-attachments');
        if(result.type){
            if(result.type.startsWith("image")){
                const imgE = document.createElement('img');
                    imgE.src = attachmentAccessURL;
                    divGoingToRender.appendChild(imgE);
                }
                if(result.type.startsWith("video")){
                    const videoE = document.createElement('video');
                    videoE.src = attachmentAccessURL;
                    divGoingToRender.appendChild(videoE);
                }
            }

}

async function main() {
  const posts = await getPosts();
  render(posts);
}

main();
