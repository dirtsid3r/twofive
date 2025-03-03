import { Button } from '@/components/ui/button'
import { SendIcon } from 'lucide-react'

// In your form
<form onSubmit={handleSubmit} className="space-y-4">
  {/* Form fields */}
  
  <Button 
    type="submit"
    variant="primary"
    icon={<SendIcon size={16} />}
  >
    Send Message
  </Button>
</form> 