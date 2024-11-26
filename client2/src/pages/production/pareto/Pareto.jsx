import { useEffect, useState } from 'react'
import style from '../production.module.css'
import { Input } from '../../../components/inputs/Inputs'
import { Select } from '../../../components/SelectComponet/Select';
import { useForm } from "react-hook-form";
import { useProduction } from '../../../context/ProductionContext';
import { edit_icon, trash_icon } from '../../../img/icons';
import Pagination from '../../../components/pagination/Pagination';
import{ProductTypeOption, CategoryOption, ReasonOption } from '../../../data/Selects'
import moment from 'moment';

const today = moment().format('MM/DD/YYYY');

const Pareto = () => {
    // const { Registation, get_Registration, Create_Registation, Update_Registation, Delete_Registration } = useProduction();
    const { Pareto, get_Pareto, Create_Pareto, Update_Pareto, Delete_Pareto } = useProduction();
    const [newPareto, setNewPareto] = useState({})
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ProdutctTypevalue, setProductsTypeValue] =  useState(ProductTypeOption[0])
    const [Categoryvalue, setCategoryValue] = useState(CategoryOption[0]);
    const [Reasonvalue, setReasonValue] = useState(ReasonOption[0]);
    

    const [entriesPerPage] = useState(5); // Change this to the desired number of entries per page
    // Get current entries
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = Pareto.slice(indexOfFirstEntry, indexOfLastEntry);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    


    const { formState: { errors }, } = useForm();

    useEffect(() => {
        get_Pareto()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value)
        setNewPareto((prev) => ({
            ...prev,
            // conver value to interger
            [name]: parseInt(value),
            // [name]: value,

        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            Sales_Order: newPareto.Sales_Order,
            Customer_Acount: newPareto.Customer_Acount,
            Product_Type: ProdutctTypevalue.value,
            Category: Categoryvalue.value,
            Reason: Reasonvalue.value,
            Date: today,

        };
        const id = currentId;

        if (isEditing) {
            // Actualizar asignación con el ID correspondiente
            Update_Pareto(id, newPareto);
        } else {
            console.log(data)
            // Crear nueva asignación
            Create_Pareto(data);
        }

        setNewPareto({});
    };

    const EditPareto = (Id, isEdit = false) => {
        setCurrentId(Id);
        setIsEditing(isEdit);

        if (isEdit) {
            // Cargar datos actuales del usuario
            const currentData = Pareto.find(data => data.DATE === today);
            if (currentData) {
                setNewPareto(currentData); // Asumimos que hay un solo conjunto de asignaciones
                setCurrentId(currentData._id); // Guardar el ID del registro actual
            } else {
                setNewPareto({}); // Si no hay asignaciones, inicializar vacío
                setCurrentId(null); // Reiniciar el ID
            }
        } else {
            setNewPareto({}); // Reiniciar para nueva asignación
            setCurrentId(null); // Reiniciar el ID
        }
    };



    




    return (
        <div className={style.Container}>
            {/* =============================================[USERS FORM]======================================= */}
            <div className={style.NewUserForm}>
                <form className={style.Form} >
                    <h1>PARETO</h1>
                    <div className={style.pareto_form}>
                    <div className={style.div1}>
                        <Input label="Sales Order" name="Sales_Order" type="number" placeholder="" value={newPareto.Sales_Order || ''} onChange={handleChange} errors={errors} />
                    </div>
                        <div className={style.div2}>    
                        <Input label="Customer Acount" name="Customer_Acount" type="number" placeholder="" value={newPareto.Customer_Acount || ''} onChange={handleChange} errors={errors} />
                    </div>
                        <div className={style.div3}>
                            <p>Product Type</p>
                            <Select
                                // {...register("access", { required: false })}
                                name="ACCESS"
                                options={ProductTypeOption}
                                value={ProdutctTypevalue || ProductTypeOption[0]}
                                type={"text"}
                                onChange={(e) => setProductsTypeValue(e)}
                            />
                        </div>
                        <div className={style.div4}>
                            <p>Category</p>
                            <Select
                                // {...register("access", { required: false })}
                                name="ACCESS"
                                options={CategoryOption}
                                value={Categoryvalue || CategoryOption[0]}
                                type={"text"}
                                onChange={(e) => setCategoryValue(e)}
                            />
                        </div>
                        <div className={style.div5}>
                            <p>Reason</p>
                            <Select
                                // {...register("access", { required: false })}
                                name="ACCESS"
                                options={ReasonOption}
                                value={Reasonvalue || ReasonOption[0]}
                                type={"text"}
                                onChange={(e) => setReasonValue(e)}
                            />
                        </div>
                    </div>
                    <div className={style.BtnInput}>
                        <button onClick={handleSubmit} className={style.btn}>{isEditing ? 'Update' : 'Assign'}</button>
                    </div>
                </form>

            </div>
            {/* =============================================[REGISTRATION LISTS]======================================= */}
            <div className={style.UsersList}>
                <h1>Pareto Submited</h1>
                <table className={style.Table}>
                    <thead>
                        <tr className={style.TableHeader}>
                            <th>DATE</th>
                            <th>Sales Order</th>
                            <th>Customer Acount</th>
                            <th>Product Type</th>
                            <th>Category</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((data) => (
                            <tr className={style.TableRow} key={data._id}>
                                <td>{data.DATE}</td>
                                <td>{data.Sales_Order}</td>
                                <td>{data.Customer_Acount}</td>
                                <td>{data.Product_Type}</td>
                                <td>{data.Category}</td>
                                <td>{data.Reason}</td>
                                <td className={style.action} >
                                    {data.DATE === today ? (
                                        <button className={style.Icons_btn} onClick={() => EditPareto(data._id, true)}>{edit_icon}</button>
                                    ) : (
                                        ""
                                    )}
                                    <button className={style.Icons_btn} onClick={() => Delete_Pareto(data._id)}>{trash_icon}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
    <tr className={style.Tablefooter}>
        <td colSpan="7">
            <Pagination 
                totalEntries={Pareto.length} 
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

export default Pareto