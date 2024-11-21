import { useEffect, useState } from 'react'
import style from '../production.module.css'
import { Input } from '../../../components/inputs/Inputs'
import { useForm } from "react-hook-form";
import { useProduction } from '../../../context/ProductionContext';
import { edit_icon, trash_icon } from '../../../img/icons';
import Pagination from '../../../components/pagination/Pagination';
import moment from 'moment';

const today = moment().format('MM/DD/YYYY');

const Scan = () => {
    const { Scan, get_Scan, Create_Scan, Update_Scan, Delete_Scan } = useProduction();
    const [newScan, setNewScan] = useState({})
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [entriesPerPage] = useState(5);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = Scan.slice(indexOfFirstEntry, indexOfLastEntry);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    const { formState: { errors }, } = useForm();

    useEffect(() => {
        get_Scan()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value)
        setNewScan((prev) => ({
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
            Update_Scan(id, newScan);
        } else {
            console.log(newScan)
            // Crear nueva asignación
            Create_Scan(newScan);
        }

        setNewScan({});
    };

    const EditScan = (Id, isEdit = false) => {
        setCurrentId(Id);
        setIsEditing(isEdit);

        if (isEdit) {
            // Cargar datos actuales del usuario
            const currentData = Scan.find(data => data.DATE === today);
            if (currentData) {
                setNewScan(currentData); // Asumimos que hay un solo conjunto de asignaciones
                setCurrentId(currentData._id); // Guardar el ID del registro actual
            } else {
                setNewScan({}); // Si no hay asignaciones, inicializar vacío
                setCurrentId(null); // Reiniciar el ID
            }
        } else {
            setNewScan({}); // Reiniciar para nueva asignación
            setCurrentId(null); // Reiniciar el ID
        }
    };
    return (
        <div className={style.Container}>
            {/* =============================================[USERS FORM]======================================= */}
            <div className={style.NewUserForm}>
                <form className={style.Form} >
                    <h1>SCAN</h1>
                    <div className={style.parent}>
                        <Input label="LS3" name="PHIS_IBO" type="number" placeholder="" value={newScan.LS3 || ''} onChange={handleChange} errors={errors} />
                        <Input label="3 Shape" name="DIGI_IBO" type="number" placeholder="" value={newScan.SHAPE || ''} onChange={handleChange} errors={errors} />
                        <Input label="Full Arch" name="PHIS_ABUT" type="number" placeholder="" value={newScan.FULL_ARCH || ''} onChange={handleChange} errors={errors} />
                        <Input label="Zeiss" name="FULL_ARCH_PRO" type="number" placeholder="" value={newScan.ZEISS || ''} onChange={handleChange} errors={errors} />
                        <Input label="Copy Mill" name="FULL_ARCH_FINAL" type="number" placeholder="" value={newScan.COPY_MILL || ''} onChange={handleChange} errors={errors} />
                    </div>
                    <div className={style.BtnInput}>
                        <button onClick={handleSubmit} className={style.btn}>{isEditing ? 'Update' : 'Assign'}</button>
                    </div>
                </form>

            </div>
            {/* =============================================[DATA LISTS]======================================= */}
            <div className={style.UsersList}>
                <h1>Scan Submited</h1>
                <table className={style.Table}>
                    <thead>
                        <tr className={style.TableHeader}>
                            <th>DATE</th>
                            <th>LS3</th>
                            <th>3 SHAPE</th>
                            <th>FULL ARCH</th>
                            <th>ZEISS</th>
                            <th>COPY MILL</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((data) => (
                            <tr className={style.TableRow} key={data._id}>
                                <td>{data.DATE}</td>
                                <td>{data.LS3}</td>
                                <td>{data.SHAPE}</td>
                                <td>{data.FULL_ARCH}</td>
                                <td>{data.ZEISS}</td>
                                <td>{data.COPY_MILL}</td>
                                <td className={style.action} >
                                    {data.DATE === today ? (
                                        <button className={style.Icons_btn} onClick={() => EditScan(data._id, true)}>{edit_icon}</button>
                                    ) : (
                                        ""
                                    )}
                                    <button className={style.Icons_btn} onClick={() => Delete_Scan(data._id)}>{trash_icon}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className={style.Tablefooter}>
                            <td colSpan="7">
                                <Pagination
                                    totalEntries={Scan.length}
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

export default Scan