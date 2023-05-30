function emailValid(email){
	return /^[^\s@]+@[^\s@]+\.[^s@]+$/.test(email)
}
function phoneValid(phone){
	//return /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone)
	return /^\d{3}\d{3}\d{4}$/.test(phone)
}
function pointValid(point){
	//return /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone)
	return /^\d{1}[.]\d{1,2}$/.test(point)
}


function reset(){
	 document.getElementById('fullname').value='';
	 document.getElementById('email').value='';
	 document.getElementById('phone').value='';
	 document.getElementById('address').value='';
	 document.getElementById('point').value='';

	 document.getElementById('point-error').innerHTML=''; 
   document.getElementById('fullname-error').innerHTML='';
   document.getElementById('email-error').innerHTML='';
   document.getElementById('phone-error').innerHTML='';
   document.getElementById('address-error').innerHTML='';
   document.getElementById('gender-error').innerHTML='';

	}

function  save() {
	if(confirm('Bạn xác nhận muốn lưu không ?')){
		//hoi cac bien
	let fullname= document.getElementById('fullname').value;
	let email= document.getElementById('email').value;
	let phone= document.getElementById('phone').value;
	let address= document.getElementById('address').value;
	let point= document.getElementById('point').value;
	let gender= '';
	
	//check gioi tinh
	if(document.getElementById('male').checked){
		gender=document.getElementById('male').value;
	}
	else if(document.getElementById('famale').checked){
	 gender=document.getElementById('famale').value;
	}


	// check name
	if (fullname ==="" ){
		document.getElementById('fullname-error').innerHTML='! Mời bạn nhập tên';
	}else if(fullname.trim().length <=2){
		fullname = '';
		document.getElementById('fullname-error').innerHTML='! Lớn hơn 2 kí tự ';
	}else if(fullname.trim().length >=50){
		fullname = '';
		document.getElementById('fullname-error').innerHTML='! Nhỏ hơn 50 kí tự ';
	}else{
			document.getElementById('fullname-error').innerHTML=' ✔checked';
	}
	//check mail
	if (email ==="" ){
		document.getElementById('email-error').innerHTML='! Mời bạn nhập email';
	}else if(!emailValid(email) ){
		email = '';
		document.getElementById('email-error').innerHTML='! Email không đúng định ';
	}else{
			document.getElementById('email-error').innerHTML=' ✔checked';
	}
	//check phone
	if (phone ==="" ){
		document.getElementById('phone-error').innerHTML='! Mời bạn nhập số phone ';
	}else if(!phoneValid(phone) ){
		phone = '';
		document.getElementById('phone-error').innerHTML='! Phone không đúng định dạng ';
	}else{
			document.getElementById('phone-error').innerHTML=' ✔checked';
	}
	//check diem
	if (point ==="" ){
		document.getElementById('point-error').innerHTML='! Mời bạn nhập điểm ';
	}else if(!pointValid(point) ){
		point = '';
		document.getElementById('point-error').innerHTML='! Điểm không đúng định dạng ';
	}else{
			document.getElementById('point-error').innerHTML=' ✔checked';
	}
	// check dia chi 	
	if (address ==="" ){
		document.getElementById('address-error').innerHTML='! Mời bạn nhập địa chỉ ';
	}else if(address.trim().length <=2){
		address = '';
		document.getElementById('address-error').innerHTML='! Lớn hơn 2 kí tự ';
	}else if(address.trim().length >=50){
		address = '';
		document.getElementById('address-error').innerHTML='! Nhỏ hơn 50 kí tự ';
	}else{
			document.getElementById('address-error').innerHTML='✔checked';
	}
	//check gender
	if (gender === ""  ){
		document.getElementById('gender-error').innerHTML='! Mời bạn chọn giới tính ';
	}else{
			document.getElementById('gender-error').innerHTML=' ✔checked';
	}

	//luu vao list
	if(fullname && email && phone && address && gender && point){

		let students=localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [] ; // lay du lieu tu mang 
		students.push({
			fullname: fullname,
			email: email,
			phone: phone,
			address: address,
			gender: gender,
			point: point,
		});

		localStorage.setItem('students', JSON.stringify(students)); //cho du lieu vao storage
		this.render(); // goi ham render
	}	
}
}

function render(){
	let students=localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [] ; // lay dl ra tu mang

		if(students.length === 0) return false;

			let table = `<tr>
              <td width="20">#</td>
              <td>Họ và tên</td>
              <td>Email</td>
              <td>Số điện thoại </td>
              <td>Địa chỉ </td>
              <td>Điểm TB </td>
              <td>Giới tính </td>
              <td>Hành động  </td>
          </tr>` ;


            students.forEach(( student, index ) => {
            	let idStudent = index;
        	index++;
        	table += `<tr>
              <td>${index}</td>
              <td>${student.fullname}</td>
              <td>${student.email}</td>
              <td>${student.phone}</td>              
              <td>${student.address}</td>
              <td>${student.point}</td> 
              <td>${student.gender}</td>  
              <td>
              <a href="#" width="20" onclick="editStudent(${idStudent})" >Edit</a> | <a href="#" onclick="deleteStudent(${idStudent})">Delete</a>
              </td>
          </tr>` ;
        })


        document.getElementById('list').innerHTML= table;    
}

function deleteStudent(id){
	let students=localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [] ;

	if(confirm('Bạn xác nhận muốn xóa không  ?')){
	students.splice(id,1) // ham xoa
}
	localStorage.setItem('students', JSON.stringify(students));// cho dl tu mang vao storage
	this.render();
	

}
function editStudent(id){
	let students=localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [] ;

    document.getElementById('fullname').value= students[id].fullname;  
    document.getElementById('email').value= students[id].email;
    document.getElementById('phone').value= students[id].phone;
    document.getElementById('address').value= students[id].address;
    document.getElementById('point').value= students[id].point;

    document.getElementById('save').style.display = 'none' ;
    document.getElementById('edit').style.display = 'inline-block' ;
    document.getElementById('index1').value = id ;
    document.getElementById('gender1').value = students[id].gender ;

}
function change(){

		if(confirm('Bạn xác nhận muốn sửa không ?')){
			
		let students=localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [] ;
		let index= document.getElementById('index1').value;
		let txt = '';
		if(document.getElementById('male').checked){
		txt = document.getElementById('male').value;
		}
		else if(document.getElementById('famale').checked){
	 	txt = document.getElementById('famale').value;
		}
			

    students[index].address = document.getElementById('address').value;
    students[index].fullname = document.getElementById('fullname').value;
    students[index].phone = document.getElementById('phone').value;
    students[index].email = document.getElementById('email').value;
    students[index].point = document.getElementById('point').value;
       
    students[index].gender = txt;

 

    localStorage.setItem('students', JSON.stringify(students));
    render();
    document.getElementById('save').style.display = 'inline-block' ;
    document.getElementById('edit').style.display = 'none' ;
		
	}else{
	  document.getElementById('save').style.display = 'inline-block' ;
    document.getElementById('edit').style.display = 'none' ;
	}
	reset();

	
}

function clearall(){
	if(confirm('Bạn xác nhận muốn xóa hết danh bạ sinh viên không ?')){
	let students=localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [] ;
	console.log(students.length)
	let all = students.length;
	for( i=0 ; i < all ;i++){
			students.splice(all-i,1);
				localStorage.setItem('students', JSON.stringify(students));

	}
	students.splice(0,1);
	localStorage.setItem('students', JSON.stringify(students));
}

}