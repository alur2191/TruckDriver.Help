import React, { useContext } from 'react'
import SearchContext from '../../store/search-context'


const AdvancedSearch = () => {

    const searchCtx = useContext(SearchContext)
    const { advanced, setAdvanced } = searchCtx
    return (
        <div className='disableHighlighting'>
            <span style={{ cursor: 'pointer' }} onClick={setAdvanced}>{advanced ? 'Обычный поиск' : 'Расширенный поиск'}</span>
        </div>

    )
}
export default AdvancedSearch;