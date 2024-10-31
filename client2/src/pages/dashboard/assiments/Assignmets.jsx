import style from './assignment.module.css'
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Modal from '../../../components/Modal/Modal';
import { Input } from '../../../components/inputs/Inputs';


const Assignmetsdata = [
	{
		user: "67212f2070f6c98bd78de32f",
		Assignmets: [{ IBO: 5, }]
	},
	{
		user: "67212f7270f6c98bd78de343",
		Assignmets: [{ IBO: 5, DIGI_ABUT: 28, }]
	},
	{
		user: "67212fc270f6c98bd78de348",
		Assignmets: [{ PHIS_ABUT: 5, FULL_ARCH: 5 }]
	},
	{
		user: "67236b01061555221e29cfb7",
		Assignmets: [{ IBO: 0, DIGI_ABUT: 28, }]
	},
]


const Assignmets = () => {
	const { usuarios, user } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [newAssign, setNewAssign] = useState([])

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
		// agregar los datos a Assignmetsdata 
	}


	const openModal = () => {
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


					<div className={style.UserCard} key={users._id} style={{ borderColor: users.color + "90" }}>
						<div className={style.CardTitle}>
							<span className={style.initials} style={{ backgroundColor: users.color }}>{`${users.fname[0]}${users.lname[0]}`}</span>
							<span className={style.UserName}>{users.fname}  {users.lname}</span>
						</div>
						<div className={style.Assignmetsdata}>
							{Assignmetsdata.map((assign) => (
								assign.user === users._id ? (
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
								<button onClick={openModal}>Assign</button>
								<Modal isOpen={isOpen} onClose={closeModal} title="Job Assignment">
									<div>
										<Input label="IBO" name="IBO" type="text" placeholder="0" onChange={handleChange} errors={""} />
										<Input label="PHIS_ABUT" name="PHIS_ABUT" type="text" placeholder="0" onChange={handleChange} errors={""} />
										<Input label="DIGI_ABUT" name="DIGI_ABUT" type="text" placeholder="0" onChange={handleChange} errors={""} />
										<Input label="FULL_ARCH" name="FULL_ARCH" type="text" placeholder="0" onChange={handleChange} errors={""} />
										<button onClick={() => handleSubmit(users._id)} className={style.btnSubmit}>Assign</button>
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

