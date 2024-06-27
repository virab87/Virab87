import Face3Icon from '@mui/icons-material/Face3';
import Face6Icon from '@mui/icons-material/Face6';
import "../gender/Gender.css"

function Gender({ searchParams, setSearchParams, genderQuery, genders }) {

    return (
        <div className="gender">
            {genders.map((obj) => {
                return (
                    <div className="female" key = {obj.id} onClick={() => {
                        setSearchParams({
                            gender: obj.id
                        })
                    }}>
                        {
                            obj.id === 1
                                ? <Face3Icon color={obj.id === genderQuery ? 'primary': 'disabled'} />
                                : <Face6Icon color={obj.id === genderQuery ? 'primary' : 'disabled'} />
                        }
                    </div>
                )
            })}
        </div>
    )
}
export default Gender