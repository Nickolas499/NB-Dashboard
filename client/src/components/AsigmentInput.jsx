import { SelectButton } from "./SelectButton"

export const AsigmentInput = (props) => {
  return (
    <div className='asigmentInput'>      
      <button className="btn" >+</button><SelectButton/><input type="text" />
    </div>
  )
}
