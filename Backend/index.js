const express = require('express')
const cors=require("cors");
const app = express()
const multer  = require('multer')
const docxConverter = require('docx-pdf');
const path=require("path"); //for aquiring path for input

const PORT=3000;
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello Gopal!')
})

//setting up the file storage using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

//dont forget to name the form as file
app.post('/convertFile', upload.single("file"), (req, res, next)=> {
     try {
         if(!req.file){
            return res.status(400).json({
                message:"No file is uploaded",
            })
         }
         //we have to provide input and output path of the file
         let outputPath=path.join(__dirname,"files",`${req.file.originalname}.pdf`);
        docxConverter(req.file.path,outputPath,(err,result)=>{
            if(err){
              console.log(err);
              return res.status(500).json({
                message:"Error occured during converting doc to pdf",
              });
            }
            res.download(outputPath,()=>{
                console.log("File downloaded successfully");
            })
            
          });
        
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Server Error",
        })
     }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
