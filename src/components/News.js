//import React, { Component } from 'react'
import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


 const News = (props) => {
     
  
      const [articles, setArticles] = useState([])
      const [loading, setLoading] = useState(true)
      const [page, setPage] = useState(1)
      const [totalResults, setTotalResults] = useState(0)

 const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
 }
  

const  updateNews = async () => {
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=923e8af1233443339851b023ad1bed7e&page=${page}&pageSize=${props.pageSize}`;
  //setState({loading: true});
  setLoading(true)
  let data = await fetch(url);
  props.setProgress(30);
  let parseData = await data.json();
  //console.log(parseData);
  props.setProgress(70);
  setArticles(parseData.articles)
  setTotalResults(parseData.totalResults)
  setLoading(false)
  props.setProgress(100);

}
  

 useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`; 

   updateNews(); //this will work manually as componentDidMount()
   //eslint-disable-next-line
 }, [])
 const handlePreviousClick = async () => {
 setPage(page-1)
  updateNews();
}


 const handleNextClick = async () => {
 console.log("next");
   setPage(page+1)
   updateNews();
 }

 const fetchMoreData = async () => {
    //this.setState({page: this.state.page + 1})
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&category=${props.category}&apiKey=923e8af1233443339851b023ad1bed7e&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    //this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json();
    //console.log(parseData);
    setArticles(articles.concat(parseData.articles) )
    setTotalResults(parseData.totalResults)

};
 
  
  
    return (
      <>
        
        <h1 className = "text-center" style={{margin: '40px 0px;', marginTop:'90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines </h1>
           {loading &&<Spinner/>} 
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults} 
          loader={<Spinner/>}
        >
          <div className="container">

       <div className="row">

       {/* {!this.state.loading &&  */}
       {articles.map((element) => {
            return  <div  className = "col-md-4" key={element.url} >
              <NewsItem   title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl= {element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
      })}
      </div>
      </div>
      </InfiniteScroll>
      
      </>
    )
  }

//instead if static we use  file name called  news.js
News.defaultProps = {
  country : 'us',
  pageSize: 8,
  category:  'general',
 }
 News.propTypes = {
   country : PropTypes.string,
   pageSize: PropTypes.number,
   category: PropTypes.string,

 }
export default News
