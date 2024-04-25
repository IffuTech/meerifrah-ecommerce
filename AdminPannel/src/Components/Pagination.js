import react from 'react'

const Pagination = ({ postsPerPage ,totalPosts ,setCurrentPage }) =>{
     let pageNumbers = [];

     for(let i=1;i<= Math.ceil(totalPosts/postsPerPage) ;i++){
        pageNumbers.push(i)
     }

     return (
        
        <nav>
          <ul className='pagination'>
            {pageNumbers.map( (number,index) =>(
                //  <li key={index} onClick={() => setCurrentPage(page)}
                //       className={page == currentPage ? 'active': ""}
                //  >{page}</li>
                <li key={index} className='page-item'>
                    <a onClick={() =>setCurrentPage(number) }href="#" className='page-link'>
                        {number}
                    </a>
                </li>
            ))}
          </ul>
        </nav>
     )
}

export default Pagination