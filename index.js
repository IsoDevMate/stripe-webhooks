const app=require('express')
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(express.json())

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    }
)