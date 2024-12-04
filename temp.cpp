#include<iostream>
using namespace std;

int main()
{//decimal to binary
    // int num;
    // cin >> num;
    // int rem, ans=0, mult=1;
    
    // while(num>0){
    //     rem=num%2;
    //     num/=2; // quotient col
    //     ans+= rem*mult;  // reverse order
    //     mult*=10;
    // }

    // binary to decimal
    int num;
    cin >> num;
    int digit, ans=0, mult=1;
    
    while(num>0){
        digit=num%10; // extract last digit
        num/=10; // remove last digit
        ans+= digit*mult;  // reverse order
        mult*=2;
    }
        cout << ans <<endl;

    return 0;

}