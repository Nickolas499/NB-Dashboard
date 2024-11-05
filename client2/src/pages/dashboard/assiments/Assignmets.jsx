import style from './assignment.module.css'
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Modal from '../../../components/Modal/Modal';
import { Input, Select } from '../../../components/inputs/Inputs';
// import { Select } from '../../../components/SelectComponet/Select';
import moment from 'moment';

const today = moment().format('MM/DD/YYYY');
console.log(today)

const initialsdata = []

const Assignmets = () => {
	const { usuarios, user } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [newAssign, setNewAssign] = useState([])
	const [currentUserId, setCurrentUserId] = useState(null);
	const [Assignmetsdata, setAssignmetsdata] = useState(initialsdata)	


	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(e.target.value)
		setNewAssign((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log(newAssign)
	};


	const handleSubmit = (id) => {
		const assign = { user: currentUserId, Assignmets: [newAssign], date: today };
		setAssignmetsdata(prevData => [...prevData, assign]);
		setNewAssign([])
		console.log(Assignmetsdata)
		closeModal();
	};


	const openModal = (userId) => {
		console.log(userId)
		setCurrentUserId(userId);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<div className={style.container}>
			<h1>ASSIGMENTS</h1>

			<div className={style.userscards}>
				{usuarios.map((users, index) => (
					<div className={style.UserCard} key={index} style={{ borderColor: users.color + "90" }}>
						<div className={style.CardTitle}>
							<span className={style.initials} style={{ backgroundColor: users.color }}>{`${users.fname[0]}${users.lname[0]}`}</span>
							<span className={style.UserName}>{users.fname}  {users.lname}</span>
						</div>
						<div className={style.Assignmetsdata}>
							{Assignmetsdata.map((assign) => (
								assign.user === users._id && assign.date === today ? (
									<div key={assign.user}>
										{assign.Assignmets.map((item, index) => (
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
								) : null // Retorna null si no se cumple la condición
							))}
						</div>
						{user.access === "admin" ? (
							<>
								<button onClick={() => openModal(users._id)}>Assign</button>
								<Modal isOpen={isOpen} onClose={closeModal} title="Job Assignment">
									<div>
										<Input label="IBO" name="IBO" type="text" placeholder="0" onChange={handleChange} errors={""} />
										<Input label="PHIS_ABUT" name="PHIS_ABUT" type="text" placeholder="0" onChange={handleChange} errors={""} />
										<Input label="DIGI_ABUT" name="DIGI_ABUT" type="text" placeholder="0" onChange={handleChange} errors={""} />
										<Input label="FULL_ARCH" name="FULL_ARCH" type="text" placeholder="0" onChange={handleChange} errors={""} />
										<Select	label="DAY OFF" name=" "	onChange={handleChange}	/>
										<button onClick={() => handleSubmit(currentUserId)} className={style.btnSubmit}>Assign</button>
									</div>
								</Modal>
							</>
						) : ""}

					</div>

				))}


			</div>

		</div>

	)
}

export default Assignmets