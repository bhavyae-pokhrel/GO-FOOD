import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
 let [foodCat, setFoodCat] = useState([])
 let [foodItem, setFoodItem] = useState([])
 let [search, setSearch] = useState('')

  const loadData = async () => {
    let response = await fetch("https://go-food-29l2.onrender.com/api/foodData", {
    //let response = await fetch("https://go-food-bkx4.onrender.com/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json()
    console.log(response[1][0].CategoryName)
    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='bg-black' style={{overflowX:'hidden'}}>
      <div>
        <Navbar />
      </div>
   
      <div className='container'>
        {
         
          foodCat.length !==0
            ? 
              foodCat.map ((data) => {
              return (

                <div className='row mb-3 text-white'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr/>
                  {
                 foodItem.length !==0 
                  ? 
                  foodItem.filter( (item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          <Card
                            foodItem={filterItems} options={filterItems.options[0]}
                          ></Card>
                        </div>
                      )
                    }
                    ) : <div> No Such Data </div>}
                </div>
              )
            }
            )
           : ""
           }
      </div>
      <Footer />
    </div>
  ) 
}

