import { useEffect, useState } from "react";
import Tours from './Tours';
import Loading from "./Loading";

const url = 'https://www.course-api.com/react-tours-project';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState();

  const removeTour = (id) => {
    const newTours = tours.filter((tour)=>{
      return tour.id !==id;
    })  
    setTours(newTours);
  }

  const fetchTour = async () => {
    setIsLoading(true);
    try {
    const response = await fetch(url);
    const tours = await response.json();
    setTours(tours);
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  }

  useEffect(()=>{
    fetchTour();
  },[])

if(isLoading) {
  return (<main>
    <Loading></Loading>
  </main>)
}

if(tours.length === 0) {
  return (<main>
    <div className="title">
      <h2>No tour left</h2>
      <button onClick={()=>fetchTour()} className="btn" style={{marginTop:'2rem'}}>refresh</button>
    </div>
  </main>)
}

  return ( <main>
    <Tours tours={tours} removeTour={removeTour}></Tours>
  </main>);
};
export default App;
