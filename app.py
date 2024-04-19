from flask import Flask, request, render_template, send_file, jsonify
import xml.etree.ElementTree as ET

app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return render_template('validate.html')

@app.route('/upload_dtd', methods=['POST'])
def upload_dtd():
    uploaded_file = request.files['xmlFile1']
    if uploaded_file.filename != '':
        xml_content = uploaded_file.read().decode('utf-8')
        try:
            root = ET.fromstring(xml_content)
            dtd_content = generate_dtd(root)
            if dtd_content is not None:
                with open('validation.dtd', 'w') as f:
                    f.write(dtd_content)
                return  (send_file('validation.dtd', as_attachment=True))
            else:
                return "<script> alert('Failed to generate DTD.');  window.location.href = '/';  </script>"
        except ET.ParseError as e:
            return f"<script> alert('Invalid XML file according to DTD.');  alert('Error at {str(e)} in your XML file.'); window.location.href = '/';  </script>"
    else:
        return "<script> alert('Please select a valid XML file.'); window.location.href = '/';  </script>"     
#Generation DTD File
def generate_dtd(element):
    dtd_content = f'<!DOCTYPE {element.tag} [\n'
    dtd_content += f'<!ELEMENT {element.tag} ('
    child_elements = []
    for child in element:
        child_elements.append(child.tag)
    dtd_content += ', '.join(child_elements)
    dtd_content += ')>\n'
    for child in element:
        dtd_content += f'<!ELEMENT {child.tag}  (#PCDATA) >\n'
    dtd_content += ']>\n'
    return dtd_content   
@app.route('/upload_xsd', methods=['POST'])
def upload_xsd():
    uploaded_file = request.files['xmlFile2']
    if uploaded_file.filename != '':
        xml_content = uploaded_file.read().decode('utf-8')
        try:
            root = ET.fromstring(xml_content)
            xsd_content = generate_xsd(root)
            if xsd_content is not None: 
                with open('validation.xsd', 'w') as f:
                    f.write(xsd_content)
                return  (send_file('validation.xsd', as_attachment=True))
            else:
                return "<script> alert('Failed to generate XSD.');  window.location.href = '/';  </script>"
        except ET.ParseError as e:
            return f"<script> alert('Invalid XML file according to XSD .');  alert('Error at {str(e)} in your XML file.'); window.location.href = '/';  </script>"
    else:
        return "<script> alert('Please select a valid XML file.'); window.location.href = '/';  </script>"

def generate_xsd(element):
    xsd_content = f'<?xml version="1.0" encoding="UTF-8"?>\n'
    xsd_content += f'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">\n'
    xsd_content += generate_xsd_element(element)
    xsd_content += f'</xs:schema>'
    return xsd_content

def generate_xsd_element(element):
    xsd_content = f'<xs:element name="{element.tag}">\n'
    xsd_content += f'<xs:complexType>\n'
    xsd_content += f'<xs:sequence>\n'
    
    # Add XSD elements for child elements
    for child in element:
        xsd_content += f'<xs:element name="{child.tag}" type="xs:string" />\n'
    
    xsd_content += f'</xs:sequence>\n'
    xsd_content += f'</xs:complexType>\n'
    xsd_content += f'</xs:element>\n'
    
    return xsd_content

if __name__ == '__main__':
    app.run(debug=True)
