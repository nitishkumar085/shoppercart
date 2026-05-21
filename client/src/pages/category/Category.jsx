import { useState } from 'react'
import './category.css'

function Category()
{
    const [checkedSelectedCategory,setCheckedselectedCategory] = useState(false)
    const [MarkAllFalse,setMarkAllFalse] = useState(true)
    let mensListItems =['T-sirts','shirt','kurta','jeans','pant','trowser'] 

    const mensList= mensListItems.map((value,i)=>{
        return(
            <p key={i}>{value}</p>
        )
    })

    const markcategory=(e)=>{
        setCheckedselectedCategory(true)
    }
    return (
        <div>
            <div>Home/mens</div>
        <div className="category_page_section">
            <div className='category_list1'>
                <div>
                    <h3 className='category_list_title'>Type</h3>
                    <div className='category_list2'>
                        <p><input type="checkbox" className='details_checkbox' onChange={markcategory}/>&nbsp;&nbsp;&nbsp;T-Shirts</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Shirts</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Jeans</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Pants</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Gym cloths</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Suits</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Undergarments</p>
                    </div>
                </div>
                <div>
                    <h3 className='category_list_title'>Color</h3>
                    <div className='category_list2'>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Black</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;White</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Blue</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Red</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Gray</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Green</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Pink</p>
                    </div>
                </div>
                <div>
                    <h3 className='category_list_title'>Price</h3>
                    <div className='category_list2'>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Less than 300 </p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;300-500</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;500-1000</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;1000-5000</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;more than 5000</p>

                    </div>
                </div>
                <div>
                    <h3 className='category_list_title'>Size</h3>
                    <div className='category_list2'>
                        <p><input type="checkbox" className='details_checkbox' style={{textAlign:"left"}}/>&nbsp;&nbsp;&nbsp;xm (extra small) </p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;sm (small)</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;M (medium)</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;L (large)</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;xl (extra large)</p>
                        <p><input type="checkbox" className='details_checkbox'/>&nbsp;&nbsp;&nbsp;Xxl (extra extra large)</p>

                    </div>
                </div>
            </div>
            <div className='product_list1'>
                <div className='sortingOptions'>
                    <div className='salesorting'>
                        <input type="checkbox"/>
                        Show only products on sale
                    </div>
                    <div>
                        <select className='sortItems'>
                            <option>Sort by popularity</option>
                            <option>Sort by average rating</option>
                            <option>Sort by rating</option>
                            <option>Sort by latest</option>
                            <option>Sort by price:low to high</option>
                            <option>Sort by price:high to low</option>
                        </select>
                    </div>
                </div>
                <div className='productListSection'>
                    <div className='product'>
                        <img src='#' className='productCardImage'/>
                        <div>
                            <h3>product name</h3>
                            <p>price and discount</p>
                            <p>rating</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    )
}

export default Category