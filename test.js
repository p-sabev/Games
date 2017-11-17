// Sum the equal numbers
// Sum the equal numbers
for(let z = 0; z <= 3; z++){
    if(nums[z][3] === nums[z][2]){
        if((nums[z][1] === nums[z][0]) && (nums[z][1] !== 0)){
            nums[z][3] += nums[z][2];
            nums[z][2] = nums[z][3];
            nums[z][1] = 0;
            nums[z][0] = 0;
        }else{
            nums[z][3] += nums[z][2];
            nums[z][2] = nums[z][1];
            nums[z][1] = nums[z][0];
            nums[z][0] = 0;
        }   
    }else if(nums[z][2] === nums[z][1]){
        nums[z][2] += nums[z][1];
        nums[z][1] = nums[z][0];
        nums[z][0] = 0;
    }else if(nums[z][1] === nums[z][0]){
        nums[z][1] += nums[z][0];
        nums[z][0] = 0;
    }
}
update();