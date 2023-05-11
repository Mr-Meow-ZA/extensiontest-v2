//% color=#0fbc11 icon="\uf1b9" block="Encoder Extension"

namespace encoderExtension {
    let count = 0;
    let targetCount = 0;

    /**
     * Attach interrupt handlers to monitor encoder pin changes
     */
    //% blockId=encoder_attach_interrupts block="attach interrupts to Encoder Signals"
    //% blockGap=8
    export function attachInterrupts(): void {
        pins.setEvents(DigitalPin.P1, PinEventType.Pulse);
        pins.setEvents(DigitalPin.P2, PinEventType.Pulse);
        control.onEvent(DigitalPin.P1, EventBusValue.MICROBIT_PIN_EVT_PULSE_HI, processCounts);
        control.onEvent(DigitalPin.P2, EventBusValue.MICROBIT_PIN_EVT_PULSE_HI, processCounts);
    }

    function processCounts(): void {
        count += 1;
        if (count === targetCount) {
            control.raiseEvent(
                EventBusSource.MICROBIT_ID_IO_P1,
                EventBusValue.MICROBIT_PIN_EVT_RISE
            );
        }
    }

    /**
     * Get the current count value
     */
    //% blockId=encoder_get_count block="get Encoder Count"
    //% blockGap=8
    export function getCount(): number {
        return count;
    }

    /**
     * Reset the count to zero
     */
    //% blockId=encoder_reset_count block="reset Encoder Count"
    //% blockGap=8
    export function resetCount(): void {
        count = 0;
    }

    /**
     * Set the target count value
     */
    //% blockId=encoder_set_target block="set Encoder Target %target"
    //% blockGap=8
    export function setTarget(target: number): void {
        targetCount = target;
    }

    /**
     * Move the motor until the count matches the target
     */
    //% blockId=encoder_move_to_target block="move motor to Encoder Target"
    //% blockGap=8
    export function moveToTarget(): void {
        if (count !== targetCount) {
            // Insert your move motor code here
        }
    }

    /**
     * Stop the motor when the target is reached
     */
    //% blockId=encoder_stop_at_target block="stop motor at Encoder Target"
    //% blockGap=8
    export function stopAtTarget(): void {
        if (count === targetCount) {
            // Insert your stop motor code here
        }
    }
}
