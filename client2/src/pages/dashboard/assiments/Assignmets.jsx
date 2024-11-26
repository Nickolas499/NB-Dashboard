import style from './assignment.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Modal from '../../../components/Modal/Modal';
import { Input, Select } from '../../../components/inputs/Inputs';
import { useAssign } from "../../../context/assignContext";
import moment from 'moment';

const today = moment().format('MM/DD/YYYY');

const Assignmets = () => {
	const { GetUsers, usuarios, user } = useAuth();
	const { GetUserJobAssignment, userJobAssignment, CreateUserJobAssignment, UpdateUserJobAssignment } = useAssign();
	const [isOpen, setIsOpen] = useState(false);
	const [newAssign, setNewAssign] = useState({});
	const [currentUserId, setCurrentUserId] = useState(null);
	const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		GetUsers();
		GetUserJobAssignment();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setNewAssign((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		const assign = { USER: currentUserId, ASSIGMENTS: [newAssign], DATE: today };
		const id = currentAssignmentId;

		if (isEditing) {
			// Actualizar asignación con el ID correspondiente
			UpdateUserJobAssignment(id, assign);
		} else {
			// Crear nueva asignación
			CreateUserJobAssignment(assign);
		}

		setNewAssign({});
		GetUserJobAssignment();
		closeModal();
	};

	const openModal = (userId, isEdit = false) => {
		setCurrentUserId(userId);
		setIsOpen(true);
		setIsEditing(isEdit);

		if (isEdit) {
			// Cargar datos actuales del usuario
			const currentAssignment = userJobAssignment.find(assign => assign.USER === userId && assign.DATE === today);
			if (currentAssignment) {
				setNewAssign(currentAssignment.ASSIGMENTS[0]); // Asumimos que hay un solo conjunto de asignaciones
				setCurrentAssignmentId(currentAssignment._id); // Guardar el ID del registro actual
			} else {
				setNewAssign({}); // Si no hay asignaciones, inicializar vacío
				setCurrentAssignmentId(null); // Reiniciar el ID
			}
		} else {
			setNewAssign({}); // Reiniciar para nueva asignación
			setCurrentAssignmentId(null); // Reiniciar el ID
		}
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<div className={style.container}>
			<h1>ASSIGMENTS</h1>
			<div className={style.AssignmetsContent}>
				{usuarios.map((users, index) => (
					<div className={style.UserCard} key={index} style={{ borderColor: users.color + "90" }}>
						<div className={style.CardTitle}>
							<span className={style.initials} style={{ backgroundColor: users.color }}>{`${users.fname[0]}${users.lname[0]}`}</span>
							<span className={style.UserName}>{users.fname} {users.lname}</span>
						</div>
						<div className={style.Assignmetsdata}>
							{userJobAssignment.map((assign, index) => (
								assign.USER === users._id && assign.DATE === today ? (
									<div key={index}>
										{assign.ASSIGMENTS.map((item, index) => (
											<div key={index} className={style.assign_container}>
												{Object.entries(item).map(([key, value]) => (
													<div key={key} className={style.assign_data}>
														<span className={style.key}>{key}</span>
														<span className={style.value}>{value}</span>
													</div>
												))}
											</div>
										))}
									</div>
								) : null
							))}
						</div>
						{user.access === "admin" ? (
							<div className={style.btnContainer}>
								{/* is user is all ready assing  show the button Edit, if not user assign or is void  show  the button Assign */}
								{userJobAssignment.some(assign => assign.USER === users._id && assign.DATE === today) ? (
									<button className={style.btnAssign} onClick={() => openModal(users._id, true)}>Edit</button>
								) : (
									<button className={style.btnAssign} onClick={() => openModal(users._id, false)}>Assign</button>
								)
								}
								<Modal isOpen={isOpen} onClose={closeModal} title="Job Assignment">
									<div className={style.modal_container}>
										<div className={style.form}>
											<Input label="IBO" name="IBO" type="text" placeholder="0" value={newAssign.IBO || ''} onChange={handleChange} errors={""} />
											<Input label="PHIS_ABUT" name="PHIS_ABUT" type="text" placeholder="0" value={newAssign.PHIS_ABUT || ''} onChange={handleChange} errors={""} />
										</div>
										<div className={style.form}>
											<Input label="DIGI_ABUT" name="DIGI_ABUT" type="text" placeholder="0" value={newAssign.DIGI_ABUT || ''} onChange={handleChange} errors={""} />
											<Input label="FULL_ARCH" name="FULL_ARCH" type="text" placeholder="0" value={newAssign.FULL_ARCH || ''} onChange={handleChange} errors={""} />
										</div>
										<div className={style.form}>
											<Select label="OTHER" name="DAY_OFF" value={newAssign.DAY_OFF || ''} onChange={handleChange} />
										</div>
										<button onClick={handleSubmit} className={style.btnSubmit}>{isEditing ? 'Update' : 'Assign'}</button>
									</div>
								</Modal>
							</div>
						) : ""}
					</div>
				))}
			</div>
		</div>
	);
};

export default Assignmets;
