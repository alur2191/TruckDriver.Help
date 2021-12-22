import classes from './comingsoon.module.css'

function Comingsoon() {

    return (
        <div className={classes.main}>
            <form className={classes.form}>
                <h3>Компания</h3>
                <div className="form-row">
                    <div>
                        <label htmlFor="name"><span className="required">*</span>Название Компании</label>
                        <input className="input-md" type="text" placeholder="Название Компании" id="name" onChange={(e) =>setName(e.target.value)}   required/>
                    </div>
                    <div>
                        <label htmlFor="mc-number"><span className="required">*</span>MC Номер</label>
                        <input className="input-md" type="number" placeholder="########" id="mc-number" onChange={(e) => setMcnumber(e.target.value)}  required/>
                    </div>
                    <div>
                        <label htmlFor="usdot"><span className="required">*</span>USDOT</label>
                        <input className="input-md" type="number" placeholder="########" id="usdot" onChange={(e) => setUsdot(e.target.value)}  required/>
                    </div>
                </div>
                <h3>Контактная Информация</h3>
                <div className="form-row">
                    <div>
                        <label htmlFor="phone"><span className="required">*</span>Телефон</label>
                        <input type="text" placeholder="Телефон" id="phone" onChange={(e) =>setPhone(e.target.value)}   required/>
                    </div>
                    <div>
                        <label htmlFor="email"><span className="required">*</span>Email</label>
                        <input type="text" placeholder="Email" id="email" onChange={(e) =>setPhone(e.target.value)}   required/>
                    </div>
                    <div>
                        <label htmlFor="fullname"><span className="required">*</span>Полное Имя</label>
                        <input type="text" placeholder="Имя" id="fullname" onChange={(e) => setSite(e.target.value)} required/>
                    </div>
                    <div>
                        <label htmlFor="position"><span className="required">*</span>Должность</label>
                        <input type="number" placeholder="Должность" id="position" onChange={(e) => setDeposit(e.target.value)} required/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Comingsoon;
