#![no_std]
#![feature(alloc_error_handler)]

extern crate alloc;
use alloc::vec;
use miden::*;

/// Treasury account for managing payroll distributions.
#[component]
struct PayrollAccount {
    /// Total amount of assets distributed via payroll.
    #[storage(description = "total payroll distributed")]
    total_distributed: Value,
}

#[component]
impl PayrollAccount {
    /// Distributes a payroll payment to an employee by creating a P2ID note.
    /// 
    /// # Arguments
    /// * `recipient_id` - The Account ID of the employee receiving the payment.
    /// * `amount` - The amount to pay.
    /// * `asset` - The fungible asset being paid.
    /// * `serial_num` - A unique serial number for the note to ensure nullifier uniqueness.
    pub fn pay_employee(
        &mut self,
        recipient_id: AccountId,
        amount: u64,
        asset: Asset,
        serial_num: Word,
    ) {
        // 1. Validate balance (Safety first!)
        let current_vault_balance = active_account::get_balance(asset.faucet_id());
        assert!(
            current_vault_balance.as_u64() >= amount,
            "Insufficient treasury balance"
        );

        // 2. Update internal accounting
        let prev_total = self.total_distributed.read();
        let new_total_amount = prev_total[0].as_u64() + amount;
        self.total_distributed.write(Word::from_u64_unchecked(new_total_amount, 0, 0, 0));

        // 3. Create the P2ID note
        // Note: The script root for P2ID is standard. In a production environment, 
        // this would be imported from the miden-standards crate.
        let p2id_script_root = Word::from_u64_unchecked(0, 0, 0, 0); // Placeholder
        
        let recipient = Recipient::compute(
            serial_num,
            p2id_script_root,
            vec![recipient_id.suffix, recipient_id.prefix],
        );

        // Tag and NoteType (Private by default)
        let tag = Tag::from(Felt::new(0));
        let note_type = NoteType::from(Felt::new(0));

        let note_idx = output_note::create(tag, note_type, recipient);
        
        // 4. Move assets from account vault to the note
        native_account::remove_asset(asset.clone());
        output_note::add_asset(asset, note_idx);
    }

    /// Returns the total amount distributed so far.
    pub fn get_total_distributed(&self) -> Felt {
        self.total_distributed.read()[0]
    }
}
