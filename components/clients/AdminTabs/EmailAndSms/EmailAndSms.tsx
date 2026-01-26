
import Email from './Email'
import Sms from './Sms'

export default function EmailAndSms() {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6'>
            <div className='lg:col-span-8'>
                <Email />
            </div>
            <div className='lg:col-span-4'>
                <Sms />
            </div>
        </div>
    )
}
