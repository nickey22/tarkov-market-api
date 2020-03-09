import React from 'react';
import logo from './logo.svg';
import './App.css';
import './App.sass';
class App extends React.Component {
  state = {
    items: null
  }
  async componentDidMount(){
    const data = await fetch("/api/getItems");
    const res = await data.json();
    const items =res.tarkovRes.result.data.allDataJson.nodes;
    this.setState({ items });
  }

  onInputChange(){
    const input = document.querySelector("#filterItems");
    const filter = input.value.toLowerCase();
    const items = document.querySelectorAll(".items-list .item");
    items.forEach(el=>{
        if(filter === ''){
            el.classList.remove("hide");
        }
        else{
            const itemName = el.querySelector(".item-name p").textContent.toLowerCase();
            itemName.indexOf(filter) === -1 ? el.classList.add("hide") : el.classList.remove("hide");
        }
    });
  }

  render(){
    formatter.format(2500); /* $2,500.00 */
    let itemsDisplay;
    !this.state.items ? itemsDisplay = <div className='loading'><p>Loading...</p></div> : itemsDisplay = <ItemsList items = {this.state.items} />;
    
    return (
      <div className="App" id = "App">
        <div className = 'dont-sue'>
          <p><span className = 'big'>NZ</span>'s makeshift tarkov api <small>please dont sue me</small></p>
        </div>
        <div className = 'filter-bar'>
          <input placeholder = "Search Items" id = 'filterItems' type = 'text'onChange = {this.onInputChange}/>
        </div>
        {itemsDisplay}
      </div>
    );
  }
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ItemsList = ({ items }) => {
  return(
    <div className = 'items-list'>
      <div className = 'table-headers'>
        <p>Item image</p>
        <p>Item Name</p>
        <p>Average Price</p>
        <p>Average Price Per Slot</p>
      </div>
      {items.map((el,index)=>{
        return(
          <div className = 'item' key = {index}>
            <div className = 'item-picture'>
              <img src = {el.imagePath} />
            </div>
            <div className = 'item-name'>
              <p>{el.name}</p>
            </div>
            <div className = 'item-average-price'>
              <p>{formatter.format(el.price_avg)}</p>
            </div>
            <div className = 'item-price-per-slot'>
              <p>{formatter.format(el.price_per_slot)}</p>
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default App;
