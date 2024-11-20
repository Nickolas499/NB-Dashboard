import style from './pagination.module.css'

const Pagination = ({ totalEntries, entriesPerPage, paginate, currentPage }) => {
    const pageNumbers = [];
    const maxPages = Math.ceil(totalEntries / entriesPerPage);

    for (let i = 1; i <= maxPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={style.paginationContainer}>
            <ul className={style.pagination}>
                <li className={style.pageItem}>
                    <button 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${style.pageLink} ${style.arrow}`}
                    >
                        &laquo;
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={style.pageItem}>
                        <button
                            onClick={() => paginate(number)}
                            className={`${style.pageLink} ${currentPage === number ? style.active : ''}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li className={style.pageItem}>
                    <button 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === maxPages}
                        className={`${style.pageLink} ${style.arrow}`}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;