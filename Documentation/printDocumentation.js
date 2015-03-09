var markdown = require("markdown-pdf");
markdown().from("documentation.md").to("./documentation.pdf", function(){
    console.log("PDF has been created");
});