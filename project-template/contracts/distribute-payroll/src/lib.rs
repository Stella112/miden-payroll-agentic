#![no_std]
#![feature(alloc_error_handler)]

use miden::*;
use crate::bindings::miden::payroll_account::payroll_account;

/// Transaction script to distribute payroll to multiple employees.
#[tx_script]
fn distribute_payroll(
    recipient_id: AccountId,
    amount: u64,
    asset: Asset,
    serial_num: Word,
) {
    // Call the PayrollAccount component to distribute the payment
    payroll_account::pay_employee(recipient_id, amount, asset, serial_num);
}
