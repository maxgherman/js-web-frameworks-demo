const value = `
    let state = 'state';

    function getter() {
        return state;
    }

    function setter(value) {
        state = value;
    }

    function action() {
        let value = getter();
        document.getElementById('placeholder').innerHTML = value;
    }
    
    
    
    
    



    using (var db = new BloggingContext())
    {
        var blog = db.Blogs.First();
     
     
        blog.Url = "http://sample.com/blog";
     
     
        db.SaveChanges();
    }
    
    
    
    
    
    `;


export default value;