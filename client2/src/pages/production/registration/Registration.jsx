import { useEffect, useState } from 'react'
import style from '../production.module.css'
import { Input } from '../../../components/inputs/Inputs'
import { useForm } from "react-hook-form";
import { useProduction } from '../../../context/ProductionContext';
import { edit_icon, trash_icon } from '../../../img/icons';
import Pagination from '../../../components/pagination/Pagination';
import moment from 'moment';

const today = moment().format('MM/DD/YYYY');

const Registration = () => {
    const { Registation, get_Registration, Create_Registation, Update_Registation, Delete_Registration } = useProduction();
    const [newRegisration, setNewRegisration] = useState({})
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [entriesPerPage] = useState(5); // Change this to the desired number of entries per page
    // Get current entries
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = Registation.slice(indexOfFirstEntry, indexOfLastEntry);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    


    const { formState: { errors }, } = useForm();

    useEffect(() => {
        get_Registration()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value)
        setNewRegisration((prev) => ({
            ...prev,
            // conver value to interger
            [name]: parseInt(value),
            // [name]: value,

        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = currentId;

        if (isEditing) {
            // Actualizar asignación con el ID correspondiente
            Update_Registation(id, newRegisration);
        } else {
            console.log(newRegisration)
            // Crear nueva asignación
            Create_Registation(newRegisration);
        }

        setNewRegisration({});
    };

    const EditRegistration = (Id, isEdit = false) => {
        setCurrentId(Id);
        setIsEditing(isEdit);

        if (isEdit) {
            // Cargar datos actuales del usuario
            const currentData = Registation.find(data => data.DATE === today);
            if (currentData) {
                setNewRegisration(currentData); // Asumimos que hay un solo conjunto de asignaciones
                setCurrentId(currentData._id); // Guardar el ID del registro actual
            } else {
                setNewRegisration({}); // Si no hay asignaciones, inicializar vacío
                setCurrentId(null); // Reiniciar el ID
            }
        } else {
            setNewRegisration({}); // Reiniciar para nueva asignación
            setCurrentId(null); // Reiniciar el ID
        }
    };



    




    return (
        <div className={style.Container}>
            {/* =============================================[USERS FORM]======================================= */}
            <div className={style.NewUserForm}>
                <form className={style.Form} >
                    <h1>Registration</h1>
                    <div className={style.parent}>
                        <Input label="Phisical IBO" name="PHIS_IBO" type="number" placeholder="" value={newRegisration.PHIS_IBO || ''} onChange={handleChange} errors={errors} />
                        <Input label="Digital IBO" name="DIGI_IBO" type="number" placeholder="" value={newRegisration.DIGI_IBO || ''} onChange={handleChange} errors={errors} />
                        <Input label="Phisical Abutment" name="PHIS_ABUT" type="number" placeholder="" value={newRegisration.PHIS_ABUT || ''} onChange={handleChange} errors={errors} />
                        <Input label="Full Arch Prototype" name="FULL_ARCH_PRO" type="number" placeholder="" value={newRegisration.FULL_ARCH_PRO || ''} onChange={handleChange} errors={errors} />
                        <Input label="Full Arch Final" name="FULL_ARCH_FINAL" type="number" placeholder="" value={newRegisration.FULL_ARCH_FINAL || ''} onChange={handleChange} errors={errors} />
                    </div>
                    <div className={style.BtnInput}>
                        <button onClick={handleSubmit} className={style.btn}>{isEditing ? 'Update' : 'Assign'}</button>
                    </div>
                </form>

            </div>
            {/* =============================================[REGISTRATION LISTS]======================================= */}
            <div className={style.UsersList}>
                <h1>Registration Submited</h1>
                <table className={style.Table}>
                    <thead>
                        <tr className={style.TableHeader}>
                            <th>DATE</th>
                            <th>PHIS IBO</th>
                            <th>DIGI IBO</th>
                            <th>PHIS ABUT</th>
                            <th>FULL ARCH PRO</th>
                            <th>FULL ARCH FINAL</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((data) => (
                            <tr className={style.TableRow} key={data._id}>
                                <td>{data.DATE}</td>
                                <td>{data.PHIS_IBO}</td>
                                <td>{data.DIGI_IBO}</td>
                                <td>{data.PHIS_ABUT}</td>
                                <td>{data.FULL_ARCH_PRO}</td>
                                <td>{data.FULL_ARCH_FINAL}</td>
                                <td className={style.action} >
                                    {data.DATE === today ? (
                                        <button className={style.Icons_btn} onClick={() => EditRegistration(data._id, true)}>{edit_icon}</button>
                                    ) : (
                                        ""
                                    )}
                                    <button className={style.Icons_btn} onClick={() => Delete_Registration(data._id)}>{trash_icon}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
    <tr className={style.Tablefooter}>
        <td colSpan="7">
            <Pagination 
                totalEntries={Registation.length} 
                entriesPerPage={entriesPerPage} 
                paginate={paginate}
                currentPage={currentPage}
            />
        </td>
    </tr>
</tfoot>
                </table>
            </div>
        </div>
    )
}

export default Registration