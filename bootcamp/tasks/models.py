from django.db import models
from django.db import models
from django.contrib.auth.models import User






class Client(models.Model):
    name = models.CharField("Full Names ", max_length=200)
    email = models.EmailField("Email", max_length=100)
    phone = models.CharField("Phone Number", max_length=100)
    

    def __unicode__(self):
        return self.name

class Property(models.Model):
    TERMS_OF_REFERENCE = (
        ("MV","Market Value"),
        ("FV","Forced Sale Value"),
        ("IV","Insurance Value"),
        ("RV","Rental Value"),
        ("CV","Capital Value"),
        ("IV","Investment Value"),
        ("MLV","Mortgage Lending Value"),
        )
    client = models.ForeignKey(Client)
    land_ref_number = models.CharField("Land Reference Number",max_length=100)
    terms_of_reference = models.CharField("Choose a Term of Reference", max_length=7, choices=TERMS_OF_REFERENCE)
    address = models.CharField("Location of the property", max_length=100)
    

    def __unicode__(self):
        return self.land_ref_number




class Task(models.Model):
    """
    Stores a single task.
    account ties task with a :model:`auth.User`
    categories tie task with :model:`tasks.Category`
    """
    
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1000, blank=True)
    start_date = models.DateField("When the Assignment Begins", help_text='Enter the date in this format yyyy-mm-dd')
    end_date = models.DateField("Expected Finish Date",help_text='Enter the date in this format yyyy-mm-dd')
    date_closed = models.DateField(blank=True, null=True,help_text='Enter the date in this format yyyy-mm-dd')
    client = models.ForeignKey(Client)
    property_details = models.ForeignKey(Property)
    assign_to = models.ForeignKey(User, related_name='+')

    def __unicode__(self):
        return "%s has been assigned to %s" % (self.title,self.assign_to.username)

    
class ValuationReport(models.Model):
    STATUS = (
        ("DR","DRAFT REPORT"),
        ("CR","COMPLETED REPORT"),
        )
   
    ### Search valuation and tasks
    name = models.CharField("Report Name",max_length=100)
    task = models.ForeignKey(Task)
    report = models.FileField(upload_to="/media")


