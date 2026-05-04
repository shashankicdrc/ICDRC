/**
 * ICDRC Custom Business Metrics
 * Registered on the global prom-client registry so express-prom-bundle
 * exposes them automatically on GET /metrics.
 *
 * Metrics exposed:
 *   icdrc_subscription_payments_total        — payment attempts by status/plan
 *   icdrc_subscription_failures_total        — PhonePe payment failures
 *   icdrc_email_sent_total                   — emails dispatched by type
 *   icdrc_email_failures_total               — email send failures by type
 *   icdrc_googlemeet_created_total           — Google Meet links created
 *   icdrc_googlemeet_errors_total            — Google Calendar API errors
 *   icdrc_mediation_cases_total              — mediation case status transitions
 *   icdrc_complaint_registrations_total      — case registrations by type
 *   icdrc_complaint_status_updates_total     — complaint status changes
 *   icdrc_subscription_expiry_reminders_total — nightly subscription cron emails
 *   icdrc_active_subscriptions_gauge         — live count of active subscriptions
 *   icdrc_bullmq_queue_depth_gauge           — BullMQ jobs waiting in queue
 */

import { Counter, Gauge } from 'prom-client';

// ─── Subscription / Payment ───────────────────────────────────────────────────

export const subscriptionPaymentsTotal = new Counter({
    name: 'icdrc_subscription_payments_total',
    help: 'Total subscription payment attempts, labelled by outcome and plan type',
    labelNames: ['status', 'plan'], // status: success|failure, plan: Individual|Organisational
});

export const subscriptionFailuresTotal = new Counter({
    name: 'icdrc_subscription_failures_total',
    help: 'Total failed subscription payments (PhonePe gateway or DB errors)',
    labelNames: ['reason'], // reason: gateway_error|db_error|already_processed|plan_not_found
});

export const activeSubscriptionsGauge = new Gauge({
    name: 'icdrc_active_subscriptions_gauge',
    help: 'Current count of active (non-expired, non-deleted) subscriptions',
});

// ─── Email Queue ──────────────────────────────────────────────────────────────

export const emailSentTotal = new Counter({
    name: 'icdrc_email_sent_total',
    help: 'Total emails successfully sent, labelled by type',
    labelNames: ['type'], // type: subscription|complaint|mediation_assign|case_accept|renewal_reminder
});

export const emailFailuresTotal = new Counter({
    name: 'icdrc_email_failures_total',
    help: 'Total failed email send attempts from the BullMQ processor',
    labelNames: ['type', 'error_code'], // error_code: ECONNREFUSED|ETIMEDOUT|EAUTH|550|etc.
});

// ─── Google Meet / Calendar ───────────────────────────────────────────────────

export const googleMeetCreatedTotal = new Counter({
    name: 'icdrc_googlemeet_created_total',
    help: 'Total Google Meet links successfully created for mediation sessions',
});

export const googleMeetErrorsTotal = new Counter({
    name: 'icdrc_googlemeet_errors_total',
    help: 'Total Google Calendar API errors when creating Meet links',
    labelNames: ['error_code'], // e.g. 401 (token expired), 403 (forbidden), 500
});

// ─── Mediation Case Lifecycle ─────────────────────────────────────────────────

export const mediationCasesTotal = new Counter({
    name: 'icdrc_mediation_cases_total',
    help: 'Total mediation case status transitions',
    labelNames: ['transition'], // session_requested|accepted|mediator_assigned|closed
});

// ─── Complaint Registrations ──────────────────────────────────────────────────

export const complaintRegistrationsTotal = new Counter({
    name: 'icdrc_complaint_registrations_total',
    help: 'Total complaints registered and paid, labelled by type',
    labelNames: ['type', 'status'], // type: IndividualComplaint|OrganizationComplaint, status: success|failure
});

export const complaintStatusUpdatesTotal = new Counter({
    name: 'icdrc_complaint_status_updates_total',
    help: 'Total complaint status update operations',
    labelNames: ['type', 'new_status'],
});

// ─── Cron: Subscription Reminders ────────────────────────────────────────────

export const subscriptionExpiryRemindersTotal = new Counter({
    name: 'icdrc_subscription_expiry_reminders_total',
    help: 'Total subscription expiry reminder emails queued by the nightly cron',
    labelNames: ['days_left_bucket'], // 15d|10d|7d|6d|5d|4d|3d|2d|1d
});

// ─── BullMQ Queue Depth ───────────────────────────────────────────────────────

export const bullmqQueueDepthGauge = new Gauge({
    name: 'icdrc_bullmq_queue_depth_gauge',
    help: 'Current number of waiting jobs in the BullMQ email queue',
    labelNames: ['queue'],
});
