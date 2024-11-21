import { useEffect, useState } from 'react'
import style from '../production.module.css'
import { Input } from '../../../components/inputs/Inputs'
import { useForm } from "react-hook-form";
import { useProduction } from '../../../context/ProductionContext';
import { edit_icon, trash_icon } from '../../../img/icons';
import Pagination from '../../../components/pagination/Pagination';
import moment from 'moment';

const today = moment().format('MM/DD/YYYY');


const Design = () => {

    const { Redesign, get_Redesign, Create_Redesign, Update_Redesign, Delete_Redesign } = useProduction();
    const [newRedesign, setNewRedesign] = useState({})
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [entriesPerPage] = useState(5);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = Redesign.slice(indexOfFirstEntry, indexOfLastEntry);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    const { formState: { errors }, } = useForm();

    useEffect(() => {
        get_Redesign()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value)
        setNewRedesign((prev) => ({
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
            Update_Redesign(id, newRedesign);
        } else {
            console.log(newRedesign)
            // Crear nueva asignación
            Create_Redesign(newRedesign);
        }

        setNewRedesign({});
    };

    const EditDesign = (Id, isEdit = false) => {
        setCurrentId(Id);
        setIsEditing(isEdit);

        if (isEdit) {
            // Cargar datos actuales del usuario
            const currentData = Redesign.find(data => data.DATE === today);
            if (currentData) {
                setNewRedesign(currentData); // Asumimos que hay un solo conjunto de asignaciones
                setCurrentId(currentData._id); // Guardar el ID del registro actual
            } else {
                setNewRedesign({}); // Si no hay asignaciones, inicializar vacío
                setCurrentId(null); // Reiniciar el ID
            }
        } else {
            setNewRedesign({}); // Reiniciar para nueva asignación
            setCurrentId(null); // Reiniciar el ID
        }
    };
    return (
        <div className={style.Container}>
            {/* =============================================[USERS FORM]======================================= */}
            <div className={style.NewUserForm}>
                <form className={style.Form} >
                    <h1>DESIGN</h1>
                    <div className={style.parent}>
                        <Input label="IBO DESIGN" name="IBO" type="number" placeholder="" value={newRedesign.IBO || ''} onChange={handleChange} errors={errors} />
                        <Input label="Crown Restoration" name="CRO_REST" type="number" placeholder="" value={newRedesign.CRO_REST || ''} onChange={handleChange} errors={errors} />
                        <Input label="Cemented Bridge Rest" name="CEM_BRI_REST" type="number" placeholder="" value={newRedesign.CEM_BRI_REST || ''} onChange={handleChange} errors={errors} />
                        <Input label="Implant Restoration" name="IMP_REST" type="number" placeholder="" value={newRedesign.IMP_REST || ''} onChange={handleChange} errors={errors} />
                        <Input label="Implant Bridge Rest" name="IMP_BRI_REST" type="number" placeholder="" value={newRedesign.IMP_BRI_REST || ''} onChange={handleChange} errors={errors} />
                        <Input label="Full Arch Prototype" name="FULL_ARCH_PRO" type="number" placeholder="" value={newRedesign.FULL_ARCH_PRO || ''} onChange={handleChange} errors={errors} />
                        <Input label="Full Arch Final" name="FULL_ARCH_FINAL" type="number" placeholder="" value={newRedesign.FULL_ARCH_FINAL || ''} onChange={handleChange} errors={errors} />
                    </div>

                    <div className={style.BtnInput}>
                        <button onClick={handleSubmit} className={style.btn}>{isEditing ? 'Update' : 'Assign'}</button>
                    </div>
                </form>

            </div>
            {/* =============================================[USERS LISTS]======================================= */}
            <div className={style.UsersList}>
                <h1>Redesign Submited</h1>
                <table className={style.Table}>
                    <thead>
                        <tr className={style.TableHeader}>
                            <th>DATE</th>
                            <th>IBO</th>
                            <th>CROWN REST</th>
                            <th>CEM BRIDGE</th>
                            <th>IMP REST</th>
                            <th>IMP BRIDGE</th>
                            <th>FULL ARCH PRO</th>
                            <th>FULL ARCH FINAL</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((data) => (
                            <tr className={style.TableRow} key={data._id}>
                                <td>{data.DATE}</td>
                                <td>{data.IBO}</td>
                                <td>{data.CRO_REST}</td>
                                <td>{data.CEM_BRI_REST}</td>
                                <td>{data.IMP_REST}</td>
                                <td>{data.IMP_BRI_REST}</td>
                                <td>{data.FULL_ARCH_PRO}</td>
                                <td>{data.FULL_ARCH_FINAL}</td>
                                <td className={style.action}>
                                    {data.DATE === today ? (
                                        <button className={style.Icons_btn} onClick={() => EditDesign(data._id, true)}>{edit_icon}</button>
                                    ) : (
                                        ""
                                    )}
                                    <button className={style.Icons_btn} onClick={() => Delete_Redesign(data._id)}>{trash_icon}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className={style.Tablefooter}>
                            <td colSpan="7">
                                <Pagination
                                    totalEntries={Design.length}
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

export default Design