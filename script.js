if ('serviceWorker' in navigator) {
  // This prevent calling the worker thread which can take significant time to execute and slow down the page, 
  // which impat the time-to-interactive
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW Registered ', reg))
      .catch(err => console.log('Boo! - ', err));
  })
}

setTimeout(() => {
  const imagesIndex = 6;

  for (let index = 1; index <= imagesIndex; index++) {
    const image = new Image();
    image.src = './assets/image-' + index + '.jpg';
    image.width = 100;
    image.height = 80;
    document.querySelector('.images').appendChild(image);
  }

  // Add a ruler separator to the ui 
  document.querySelector('.app').appendChild(document.createElement('hr'));

  console.log(getDummayComments());
}, 1000);


function getDummayComments() {
  let fakeComments = null;
  const fakeCommentsResponse = fetch('https://jsonplaceholder.typicode.com/comments')
    .then((res) => { return res.json() })
    .then((data) => {
      let comments = data;

      buildCommentCard(comments);
    })
    .catch(err => console.log(err));

  return fakeComments;
}

function buildCommentCard(data) {
  data.forEach(comment => {
    const div = document.createElement('div');
    div.classList.add('comment')

    const name = document.createElement('p');
    name.innerText = comment.name;
    const email = document.createElement('p');
    email.innerText = comment.email;
    const body = document.createElement('p');
    body.innerText = comment.body;

    div.appendChild(name);
    div.appendChild(email);
    div.appendChild(body);
    document.querySelector('.app').appendChild(div);
  });
}