import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">contact@airsense.com</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Quick Response</h3>
              <p className="text-sm text-muted-foreground">Within 24 hours</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-12 animate-fade-in">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your message has been sent successfully. We'll respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Contact;
