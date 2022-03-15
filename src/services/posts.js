
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


let commentListnerInstance = null;
let reviewListnerInstance = null


// let commentListnerInstance = null
// /**
//  * Returns all the posts in the database.
//  *
//  * @returns {Promise<[<Object>]>} post list if successful.
//  */
export const getFeed = (data) => new Promise((resolve, reject) => {
  firestore()
    .collection("post")
    .where('creator', 'not-in', data.currentUser.blocked !== undefined ? data.currentUser.blocked : ['blocked_none'])
    .get()
    .then((res) => {
      let posts = res.docs.map((value) => {
        const id = value.id;
        const data = value.data();
        return { id, ...data };
      });
      resolve(posts);
    });
});

// /**
//  * Gets the like state of a user in a specific post
//  * @param {String} postId - id of the post
//  * @param {String} uid - id of the user to get the like state of.
//  *
//  * @returns {Promise<Boolean>} true if user likes it and vice versa.
//  */
export const getLikeById = (postId, uid) =>
  new Promise((resolve, reject) => {
    firestore()
      .collection("post")
      .doc(postId)
      .collection("likes")
      .doc(uid)
      .get()
      .then((res) => resolve(res.exists));
  });

// /**
//  * Updates the like of a post according to the current user's id
//  * @param {String} postId - id of the post
//  * @param {String} uid - id of the user to get the like state of.
//  * @param {Boolean} currentLikeState - true if the user likes the post and vice versa.
//  */
export const updateLike = (postId, uid, currentLikeState) => {
  if (currentLikeState) {
    firestore()
      .collection("post")
      .doc(postId)
      .collection("likes")
      .doc(uid)
      .delete();
  } else {
    firestore()
      .collection("post")
      .doc(postId)
      .collection("likes")
      .doc(uid)
      .set({});
  }
};

export const addComment = (postId, creator, comment) => {
  firestore()
    .collection('post')
    .doc(postId)
    .collection('comments')
    .add({
      creator,
      comment,
      creation: firestore.FieldValue.serverTimestamp(),
    })
}

export const addReviews = (userId, creator, comment) => {
  firestore()
    .collection('user')
    .doc(userId)
    .collection('reviews')
    .add({
      creator,
      comment,
      creation: firestore.FieldValue.serverTimestamp(),
    })
}

export const reportVideo = (postId, index, creator, comment) => new Promise((resolve, reject) => {
  firestore()
    .collection('post')
    .doc(postId)
    .collection('report')
    .add({
      creator,
      index,
      comment,
      creation: firestore.FieldValue.serverTimestamp(),
    }).then(() => resolve())
    .catch(() => reject())
});

export const commentListner = (postId, setCommentList) => {
  commentListnerInstance = firestore()
    .collection('post')
    .doc(postId)
    .collection('comments')
    .orderBy('creation', 'desc')
    .onSnapshot((snapshot) => {
      if (snapshot.docChanges().length == 0) {
        return;
      }
      let comments = snapshot.docs.map((value) => {
        const id = value.id;
        const data = value.data();
        return { id, ...data }
      })
      setCommentList(comments)
    })
}


export const reviewListner = (userId, setReviewsList) => {
  commentListnerInstance = firestore()
    .collection('user')
    .doc(userId)
    .collection('reviews')
    .orderBy('creation', 'desc')
    .onSnapshot((snapshot) => {
      if (snapshot.docChanges().length == 0) {
        return;
      }
      let reviews = snapshot.docs.map((value) => {
        const id = value.id;
        const data = value.data();
        return { id, ...data }
      })
      setReviewsList(reviews)
    })
}


export const clearCommentListener = () => {
  if (commentListnerInstance != null) {
    commentListnerInstance();
    commentListnerInstance = null
  }
}

export const clearReviewListener = () => {
  if (reviewListnerInstance != null) {
    reviewListnerInstance();
    reviewListnerInstance = null
  }
}

export const getPostsByUserId = (uid = auth().currentUser.uid) => new Promise((resolve, reject) => {
  firestore()
    .collection('post')
    .where('creator', '==', uid)
    .onSnapshot((snapshot) => {
      let posts = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      });
      resolve(posts)
    })
})

export const getLikedPostByUserId = (uid = auth().currentUser.uid) => new Promise((resolve, reject) => {
  firestore()
    .collection('post')
    .where('likes', '==', uid)
    .onSnapshot((snapshot) => {
      let posts = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      });
      console.log(posts);
      resolve(posts)
    })
})
