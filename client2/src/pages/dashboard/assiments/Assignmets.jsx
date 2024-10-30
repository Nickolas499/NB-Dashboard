import style from './assignment.module.css'
import { useAuth } from '../../../context/AuthContext';


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
]






const Assignmets = () => {
	const { usuarios, } = useAuth();



	return (
		<div className={style.container}>
			<h1>ASSIGMENTS</h1>

			<div className={style.userscards}>
				{usuarios.map((user) => (
					<div className={style.UserCard} key={user._id} style={{ borderColor: user.color + "90" }}>
						<div className={style.CardTitle}>
							<span className={style.initials} style={{ backgroundColor: user.color }}>{`${user.fname[0]}${user.lname[0]}`}</span>
							<span className={style.UserName}>{user.fname}  {user.lname}</span>
						</div>
						<div className={style.Assignmetsdata}>
							{Assignmetsdata.map((assign) => (
								assign.user === user._id ? (
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
						



					</div>
				))}
			</div>

		</div>

	)
}

export default Assignmets

