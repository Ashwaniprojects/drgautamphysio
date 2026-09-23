# Booking & Automation — Functional Spec

## 1. Booking widget (₹500/month product)

### Patient-facing flow
1. Choose location (Subhash Marg / Neera Hospital / Medox Hospital) — filters everything downstream to that location's actual availability. *(needs: `01-requirements-checklist.md` §B — days/hours per location)*
2. Choose date — only days the doctor is confirmed present at that location are selectable.
3. Choose time slot — slot length depends on per-location session duration *(needs: §B)*.
4. Patient details: name, phone (required — used for WhatsApp confirmation and reminders), age (optional), reason for visit/condition (optional, helps intake), new-vs-returning toggle.
5. Confirmation screen + automatic WhatsApp/SMS confirmation.
6. Stateful submit button: "Confirm booking" → "Booking…" → "Booked — we'll confirm on WhatsApp."

### Management-side (reception / Dr. Gautam)
- Calendar/list view across all 3 locations, filterable by location and date
- Manual add/edit/reschedule/cancel
- Status per appointment: scheduled / completed / no-show / cancelled — **this status feed is what the recall automation in §2 reads from**
- Patient record: name, phone, visit history, condition tags, notes
- Receipt generation/printing
- Prescription upload/attach per appointment

### Minimum data model
- `Location` — id, name, address, days_open, hours
- `Slot` — location_id, date, time, duration, status (open/booked)
- `Patient` — id, name, phone, email (optional), first_visit_date, condition_tags
- `Appointment` — id, patient_id, location_id, slot, status, notes

## 2. Retention automation (proposal §3) — build on the existing self-hosted n8n

The booking system needs to expose appointment/patient data to n8n (a webhook on status change, or a scheduled DB read). That's the one real integration point to get right; the automation logic itself is straightforward once the data is reachable.

| Trigger | Logic | Data needed |
|---|---|---|
| Occasion-based (birthday/anniversary/festival) | Date match against patient record | Patient DOB/anniversary — not in the booking fields above by default; confirm with the client whether to collect it as an optional field (shouldn't block booking completion) |
| Repeat/recall | Last visit older than X days, no new booking since | X varies by condition — *(needs: §C — typical recall window per condition, from the doctor)* |
| Mid-treatment drop-off | Fewer completed sessions than the condition's typical program length, with a gap since the last one | Needs a lightweight "expected session count" per condition — *(needs: §C)* |
| Seasonal/festival campaign | Calendar-based, not patient-specific | No patient data needed — simplest to build first |

### Compliance note — build this in from the start
WhatsApp Business API restricts template/marketing messages to opted-in numbers; a number sending unsolicited marketing messages risks being flagged or restricted. Capture opt-in explicitly at booking (a checkbox, not an assumption), and keep transactional messages (booking confirmations, reminders) separate from marketing sends (recall, offers, occasion greetings) in the n8n workflow logic — they're governed differently under WhatsApp's own rules.
