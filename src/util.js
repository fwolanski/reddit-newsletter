import axios from 'axios'
import htmlparser from 'htmlparser2'

const getComments = (state, postId) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.reddit.com/r/${state.subreddit.name}/comments/${postId}.json?limit=${state.commentCount}&depth=1&sort=top`)
      .then((response) => {
        let comments = response.data[1].data.children;
        comments = comments
          .map(value => value.data)
          .filter((value) =>
            // remove deleted posts
            (value.body && value.body !== "[deleted]")
            // remove top mod stickied posts
            && (value.distinguished !== "moderator" && !value.stickied)
          );
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

const resetParams = () => {
  const query = window.location.search;
  const regex = /[?&;](.+?)=([^&;]+)/g;
  let match;

  let params = {};

  if (query) {
    while (match = regex.exec(query)) {
      params[match[1]] = decodeURIComponent(match[2]);
    }
  }
  return params;
};


// TODO  : disabled; awaiting node solution
const addTargetToAnchors = (element) => {
  if (element.tagName === "A" || element.tagName === "a") {
    element.setAttribute("target", "_blank");

    // TODO: can't link to self in comments
    if (element.host === window.location.host || !element.host) {
      element.setAttribute('href',
        `https://www.reddit.com${element.pathname}${element.search}${element.hash}`)
    }
  }

  let children = Array.from(element.children);
  children.forEach((child) => {
    addTargetToAnchors(child);
  });

};

export const toHtml = (value) => {
  if (value === "" || value === null) return "";

  let replacements = [
    ['amp', '&'],
    ['apos', '\''],
    ['lt', '<'],
    ['gt', '>'],
    ['quot', '"']
  ];

  replacements.forEach(function(replace){
    value = value.replace(new RegExp('&'+replace[0]+';', 'g'), replace[1]);
  });
  return value;

};

const SERVER = "http://localhost:5002";
export const subscribe = (state) => {

  // don't send posts over the wire
  delete state['posts'];

  return axios.post(`${SERVER}/subscribe`, state);


}
