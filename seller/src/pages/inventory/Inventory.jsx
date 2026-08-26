
import './inventory.css'

function Inventory(){
    return(
        <div className='inventorySection'>
            <h3 className='inventoryTitle'>Inventory Management</h3>
            <div className='inventoryOverviewPerformancesection'>
                <div className='inventoryOverview'>
                    <div>
                        <h4>Inventory Overview & actions</h4>
                        <div></div>
                    </div>
                    <div>
                        <h4>Quick actions & Buttons</h4>
                        <div></div>
                    </div>
                </div>
                <div className='inventoryPerformance'></div>
            </div>
        </div>
    )
}

export default Inventory