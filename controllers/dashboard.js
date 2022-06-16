import axios from 'axios'

export const dashboard = async (req, res)=>{
    let user = req.user
    async function getNews(){
        await axios.get(`https://content.guardianapis.com/search?api-key=${process.env.NEWS_API_KEY}`).then(async response=> {
        try{
            let news = response.data.response.results
            await axios.get("https://zenquotes.io/api/quotes/").then(response=>{
                try{
                    let quote = response.data[0]
                    res.render('dashboard', {title:"Dashboard", news:news, quote:quote, user:user})
                }catch(err){
                    console.log(err)
                    res.send("Something went wrong")
                }
            })
        }catch(err){
            console.log(err)
            res.send("Something went wrong")
        }
    }) 
    }   
    getNews()
}
