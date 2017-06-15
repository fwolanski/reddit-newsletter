import axios from 'axios'


const getComments = (state, postId) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.reddit.com/r/${state.subreddit.name}/comments/${postId}.json?limit=${state.commentCount}&depth=0&sort=top`)
      .then((response) => {
        let comments = response.data[1].data.children;
        comments = comments
          .map(value => value.data)
          .filter((value) => value.body && value.body !== "[deleted]");
        resolve(comments);

      }).catch((err) => {
      reject(err);
    });
  });
};

export const getPosts = (state, success, failure) => {

  let freq = "";
  switch (state.frequency) {
    case "monthly": freq ="month"; break;
    case "daily": freq ="day"; break;
    case "weekly": freq ="week"; break;
    default:
      console.error(`unknown ${state.frequency}`);
      failure();
      return;
  }

  axios.get(`https://www.reddit.com/r/${state.subreddit.name}/top.json?limit=${state.postCount}&t=${freq}`)
    .then( (response) => {

      let listings = response.data.data.children;
      let posts = listings.map( item => item.data);

      if (state.commentCount > 0) {
        let promises = posts.reduce((promises, post) => {
          promises.push(getComments(state, post.id));
          return promises;
        }, []);

        Promise
          .all(promises)
          .then((comments) => {
            posts.forEach((post, i) => {
              post.comments = comments[i];
            });
            success(posts);
          });
      } else {
        success(posts);
      }
    }).catch( (err) => {
    console.error(err);
    failure(err)
  });

};

export const toHtml = (value) => {
  if (value === "" || value === null) return "";
  let e = document.createElement('div');
  e.innerHTML = value;
  return e.childNodes[0].nodeValue;
};

