import React, {useEffect,useState}  from "react";
import "./index.css";

function MovieList() {

  // API fetch - useEffect
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sent,setSent]=useState(false);


  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  
 
  
  useEffect (()=>{
    if(sent){
      fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${inputValue}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      ).then(()=>setSent(false))
    }
   
  })

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input" 
             value={inputValue} onChange={(e)=>setInputValue(e.target.value)}            />
        <button className="" type="submit" onClick={()=>setSent(true)} data-testid="submit-button" >Search</button>
      
      </section>
      {isLoaded?
      (items.length===0?<div>No Results Found</div>:(
      <ul className="mt-50 styled" data-testid="movieList">
        {items.map(item => (
          <li className="slide-up-fade-in py-10" key={item.id}>
            {item.Title} 
          </li>
        ))}
      </ul>)):
      
     

      <div className="mt-50 slide-up-fade-in" data-testid="no-result"></div>
        }
    </div>
  );
}

export default MovieList