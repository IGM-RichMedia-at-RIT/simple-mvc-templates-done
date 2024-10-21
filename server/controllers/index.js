// There is no reason for the name here except as an
// example of how to set something for the POST
let name = 'unknown'; // We will set and get an arbitrary name

// function to handle requests to the main page
// controller functions in Express receive the full HTTP request
// and a pre-filled out response object to send
const hostIndex = (req, res) => {
  // res.render takes a name of a page to render.
  // These must be in the folder you specified as views in your main app.js file
  // Additionally, you don't need .handlebars because you registered the file type
  // in the app.js as handlebars. Calling res.render('index')
  // actually calls index.handlebars. A second parameter of JSON can be passed
  // into the handlebars to be used as variables with #{varName}
  res.render('index', {
    currentName: name,
    title: 'Home',
    pageName: 'Home Page',
  });
};

// function to handle requests to the gallery page
// controller functions in Express receive the full HTTP request
// and a pre-filled out response object to send
const hostPage1 = (req, res) => {
  // In this example, our page1.handlebars has a variable for looping over an array of
  // names. We could give it the entire myArray, but if we want to limit the data we use
  // our javascript controller code to filter it beforehand and then have the template
  // display it. Even though handlebars supports some light logic with build in helpers, it
  // is not the job of the view to perform logical operations.
  const myArray = ['Austin', 'Cody', 'Erika', 'Eric'];
  const filtered = myArray.filter(x => x.length <= 4);

  // res.render takes a name of a page to render.
  // These must be in the folder you specified as views in your main app.js file
  // Additionally, you don't need .handlebars because you registered the file
  // type in the app.js as handlebars. Calling res.render('index')
  // actually calls index.handlebars. A second parameter of JSON can be passed
  // into the handlebars to be used as variables with #{varName}
  return res.render('page1', {
    title: 'Page 1',
    names: filtered,
  });
};

// function to handle requests to the gallery page
// controller functions in Express receive the full HTTP request
// and a pre-filled out response object to send
const hostPage2 = (req, res) => {
  // res.render takes a name of a page to render. These must be in the folder you
  // specified as views in your main app.js file
  // Additionally, you don't need .handlebars because you registered the file type
  // in the app.js as handlebars. Calling res.render('index')
  // actually calls index.handlebars. A second parameter of JSON can be passed
  // into the handlebars to be used as variables with #{varName}
  res.render('page2');
};

// function to handle get request to send the name
// controller functions in Express receive the full HTTP request
// and a pre-filled out response object to send
const getName = (req, res) => {
  // res.json returns json to the page.
  // Since this sends back the data through HTTP
  // you can't send any more data to this user until the next response
  res.json({ name });
};

// function to handle a request to set the name
// controller functions in Express receive the full HTTP request
// and get a pre-filled out response object to send
// ADDITIONALLY, with body-parser we will get the
// body/form/POST data in the request as req.body
const setName = (req, res) => {
  // check if the required fields exist
  // normally you would also perform validation to know
  // if the data they sent you was real
  if (!req.body.firstname || !req.body.lastname) {
    // if not respond with a 400 error
    // (either through json or a web page depending on the client dev)
    return res.status(400).json({ error: 'firstname and lastname are both required' });
  }
    
  // if required fields are good, then set name
  name = `${req.body.firstname} ${req.body.lastname}`;

  // respond with our new name updated.
  // This could just be a 200 response to say the name was good
  // but we will also throw in the json of the new name just for convenience
  // We need to return here for ESLint, since this is a branching arrow function
  return res.json({ name });
};

// function to handle a request to any non-real resources (404)
// controller functions in Express receive the full HTTP request
// and get a pre-filled out response object to send
const notFound = (req, res) => {
  // res.render takes a name of a page to render.
  // These must be in the folder you specified as views in your main app.js file
  // Additionally, you don't need .handlebars because you registered the file
  // type in the app.js as handlebars. Calling res.render('index')
  // actually calls index.handlebars. A second parameter of JSON can be passed
  // into the handlebars to be used as variables with #{varName}
  res.status(404).render('notFound', {
    page: req.url,
  });
};

// export the relevant public controller functions
module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  getName,
  setName,
  notFound,
};
